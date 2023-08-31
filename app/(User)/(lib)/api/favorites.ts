import { Collection } from "mongodb";
import { OPERATION } from "./setFave/types";

const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export const addFavorite = async(email:string,value:string) => {
  
  
  try {

    await client.connect();
    const db = client.db("the-cool-webstore");
    const userFavorites:Collection = db.collection("userFavorites");
    
    
    await userFavorites
      .updateOne(
        {email:email},
        {$addToSet:{
          favorites:value
        }})
    
        .then(async(res)=>{
          if (res.matchedCount==0){
            await userFavorites.insertOne({email:email,favorites:[value]});
          }
        });


    return OPERATION.SUCCESS;
  } 
  // { $pull: { favorites: 'hola!' } } )

  catch(e){
    return OPERATION.ERROR;
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export const removeFavorite = async(email:string,value:string) => {
  
  
  try {

    await client.connect();
    const db = client.db("the-cool-webstore");
    const userFavorites:Collection = db.collection("userFavorites");
    
    
    await userFavorites
      .updateOne(
        {email:email},
        {$pull:{
          favorites:value
        }})
        .then(async(res)=>{
          if (res.matchedCount==0){
            await userFavorites.insertOne({email:email,favorites:[value]});
          }
        });


    return OPERATION.SUCCESS;
  } 

  catch(e){
    return OPERATION.ERROR;
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export const getFavorites = async(email:string):Promise<[]>=>{

  try {

    await client.connect();
    const db = client.db("the-cool-webstore");
    const userFavorites:Collection = db.collection("userFavorites");
    
    
    return await userFavorites
      .findOne(
        {email:email}
      )
      .then(async(res)=>{

          if (!res ){
            await userFavorites.insertOne({email:email,favorites:[]});
            return [];

          }
          else{
            if (res.favorites){
                return res.favorites;
            }
          }
      });

  } 
  catch(e){
    return [];
  }
  // { $pull: { favorites: 'hola!' } } )

  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}

