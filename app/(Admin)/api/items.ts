'use server'

import { ProductCollection } from "@chec/commerce.js/features/products";
import { Product } from "@chec/commerce.js/types/product";

export const fetchItemsADMIN = async (params: { [key: string]: string }): Promise<ProductCollection["data"]> => {


    const url = new URL(
      "https://api.chec.io/v1/products"
    )
  
  
    Object.keys(params)
      .forEach(key => url.searchParams //appending to url
        .append(
          key, params[key]
        ))
  
    const headers = {
      "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" //stop fetch errors
  
    };
  
    const res = await fetch(url, {
      method: "GET",
      headers: headers,
      next: {revalidate: 0}
    })
  
    if (!res.ok) {
      throw new Error(`Fetch failed`);
    }
    return res.json().then(result => result.data);
}
  
export type ItemUpdateData = {
  product_id:string;
  properties:{
    product:{
      name:string;
      permalink:string;
      active:boolean|null;
      sku:string|null;
      description:string;
      price:number;
      inventory:{
        managed:boolean|null;
        available:number;
      }
    }
    categories:{
      [key:number]:{id:string}
    }
  }        
}

export const updateItem = async (product_id:string,newProduct:ItemUpdateData["properties"]) => {
  
  
    const url = new URL(
      `https://api.chec.io/v1/products/${product_id}`
    )
  
  
  
    const headers = {
      "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" //stop fetch errors
  
    };

  

    const body = newProduct;
    console.log(newProduct)

  
    const res = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    })
  
    if (!res.ok) {
      throw new Error(`Fetch failed`);
    }
    return res.json();
  }