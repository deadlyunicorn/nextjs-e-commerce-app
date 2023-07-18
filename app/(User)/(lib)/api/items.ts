'use server'


import { ProductCollection } from "@chec/commerce.js/features/products";
import { Product } from "@chec/commerce.js/types/product";

export const fetchItems = async (params: { [key: string]: string }): Promise<ProductCollection["data"]> => {


  const url = new URL(
    "https://api.chec.io/v1/products"
  )


  Object.keys(params)
    .forEach(key => url.searchParams //appending to url
      .append(
        key, params[key]
      ))

  const headers = {
    "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
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

export const updateItem = async (product_id:string,newProduct:Product|undefined=undefined) => {


  const url = new URL(
    `https://api.chec.io/v1/products/${product_id}`
  )



  const headers = {
    "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*" //stop fetch errors

  };

  const body = {
    product:{
      // name: "CoolCatto",
      // permalink:"cool-cat"
      // active:false
      // sku:null, //string -- undefined won't change the value -- null will nullify
      // description:"<p>Rofl 54</p>" //<p>Nyan the cat. A cat that nyans</p>
      price:92,
      inventory:{
        // managed:true, //undefined or bool,
        // available:20
      },
    },
    categories:{
      // '*':{
      //   id:'cat_RqEv5xPy95Zz4j'
      // },
      // '1':{
      //   id:'cat_8XxzoBkXV5PQAZ'
      // }
    }
  }

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