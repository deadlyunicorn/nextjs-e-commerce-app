import { updateItem } from "@/app/(Admin)/api/items";
import { redirect } from "next/navigation";

import { ItemUpdateData } from "@/app/(Admin)/api/items";
import { NextResponse } from "next/server";

export async function POST(req:Request){


    const formData = await req.formData();
    const data:ItemUpdateData = {
        product_id:"",
        properties:{
            product:{
                name:"",
                permalink:"",
                active:false,
                sku:null,
                description:"",
                price:0,
                inventory:{
                    managed:false,
                    available:0,
                }
            },
            categories:{}
        }

    };

    let categoryIndex=0;

    const BooleanFields = ["managed","active"] as const;
    const NumberFields = ["price","available"] as const;
    const StringFields = ["description","permalink","product_id","name","sku"] as const;
    const NotCategoryKey = [...BooleanFields,...NumberFields,...StringFields];


    for (const entry of formData.entries()){

        console.log(entry);

        const [key,value]
            :[key:string,value:FormDataEntryValue]
            = entry;


        if (key=="product_id"){
            data.product_id=String(value);
        }

        else if(key.includes("category.cat")){

            data.properties.categories={
                
                ...data.properties.categories,
                [categoryIndex]:{
                
                    id:String(key.slice(9))
                
                }
                
            }

            categoryIndex++;
        }

        else{
            
            // @ts-ignore 
            if ( BooleanFields.includes(key) ){

                const fixedValue = value=="on"?true:value;
                
                
                if ( key == "managed" ) {
                    data.properties.product.inventory.managed = Boolean(fixedValue);
                }
                else{
                    
                    // @ts-ignore 
                    data.properties.product[key]=Boolean(fixedValue)
                } 
    
            }
            
            // @ts-ignore 
            else if ( NumberFields.includes(key) ){

                if ( key == "available") { 
                    data.properties.product.inventory.available = +value;
                }
                else{
                    
                    // @ts-ignore 
                    data.properties.product[key]=+value
                } 
            }
            
            // @ts-ignore 
            else if(StringFields.includes(key)){
                
                // @ts-ignore 
                data.properties.product[key]=String(value)
            }
        }
    }


    try{
        await updateItem(data.product_id,data.properties)
    }
    catch(error){
        console.log(error)
    }
    
    return NextResponse.json(data.properties)
}