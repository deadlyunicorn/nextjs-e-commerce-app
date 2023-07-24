'use server'


import { ProductCollection } from "@chec/commerce.js/features/products";

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
    next: {revalidate: 60 * 30}
  })

  if (!res.ok) {
    throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
  }
  return res.json().then(result => result.data);
}

