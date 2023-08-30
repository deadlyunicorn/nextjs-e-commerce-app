import { AdminList } from "./admins";

export const getAllAssets = async()=>{

    const url = new URL(
        `https://api.chec.io/v1/assets`
    );

    const headers = {
        "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
    };

    const res:Response=await fetch(url, {
        method: "GET",
        headers: headers,
        cache: 'no-cache'
    })
    if (!res.ok) {
       throw ` ${res.status}:  ${res.statusText}, ${res.url} `;
    }


    return res.json();


}

export const uploadAsset = async(imageBase64:string,fileName:string,adminEmail:string) =>{

    if (! AdminList.includes(adminEmail)){
        throw 'Unauthorized Email';
      }
    const body = {
        filename: fileName,
        contents: imageBase64,
    }

    const url = new URL(
        `https://api.chec.io/v1/assets`
    );

    const headers = {
        "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "" 
    };

    const res:Response=await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    })
    if (!res.ok) {
       throw ` ${res.status}:  ${res.statusText}, ${res.url} `;
    }

    
    return await res.json();

}

export const setAsset = async (product_id:string,asset_id:string,adminEmail:string)=>{

    if (! AdminList.includes(adminEmail)){
        throw 'Unauthorized Email';
      }
    const url = new URL(
      `https://api.chec.io/v1/products/${product_id}/assets`
    )
  
  
  
    const headers = {
      "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" //stop fetch errors
  
    };


  
    const res = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({assets:{1:{id:asset_id}}})
    })


    const resJSON = await res.json();

  
    if (!res.ok) {
      throw (JSON.stringify(resJSON.error.message)+JSON.stringify(resJSON.error.errors))
    }

    return resJSON;

  }