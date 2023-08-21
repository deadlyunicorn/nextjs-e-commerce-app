import { Order } from "@chec/commerce.js/types/order";

export const getOrders = async (params: { [key: string]: string }): Promise<Order[]> => {


    const url = new URL(
      "https://api.chec.io/v1/orders"
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
      throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
    }
    return res.json().then(result => result.data);
}

export const getOrder = async(order_id:string):Promise<Order>=>{
  const url = new URL(
    `https://api.chec.io/v1/orders/${order_id}`
);

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
  throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
}
return res.json().then(result => result);
}