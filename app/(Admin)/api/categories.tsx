import { Category } from "@chec/commerce.js/types/category";
import { AdminList } from "./admins";

export const fetchCategoriesADMIN = async ():Promise<Category[]> => {
    const url = new URL(
        "https://api.chec.io/v1/categories/"
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"

    };

    const res = await fetch(url, {
        method: "GET",
        headers: headers,
        next: {revalidate: 0}
    })

    if (!res.ok) {
        throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
    }
    return res.json().then(result =>{

        const categories:Category[]=result.data;
        return categories;
    });

}

export type CategoryPOST={
    slug:string;
    name:string;
    description:string|undefined;
}


export const createCategory = async (newCategory:CategoryPOST) => {
  
    //current version is vulnerable!!
    //one can just modify the url and
    //create a new category even in guest mode.
    
    // http://localhost:3000/admin/categories/create/loading?name=Example&slug=This-is-vulnerable&description=hello+world%21
    // the form won't submit


  
    const url = new URL(
      `https://api.chec.io/v1/categories`
    )
  
  
  
    const headers = {
      "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" //stop fetch errors
  
    };

  

    const body = newCategory;

  
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })


    const resJSON = await res.json();

  
    if (!res.ok) {
      throw (JSON.stringify(resJSON.error.message)+JSON.stringify(resJSON.error.errors))
    }

    return resJSON;
  }

export type CategoryPUT={
  category_id:string,
  
  properties:{

    slug:string;
    name:string;
    description:string|undefined;
  
  },

};
  

export const editCategory = async (newCategory:CategoryPUT,adminEmail:string) => {
  
  if (! AdminList.includes(adminEmail)){
    throw 'Unauthorized Email';
  }
  
  const url = new URL(
    `https://api.chec.io/v1/categories/${newCategory.category_id}`
  )



  const headers = {
    "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*" //stop fetch errors

  };



  const body = newCategory.properties;


  const res = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  })


  const resJSON = await res.json();


  if (!res.ok) {
    throw (JSON.stringify(resJSON.error.message)+JSON.stringify(resJSON.error.errors))
  }

  return resJSON;
}

export const deleteCategory = async (category_id:string,adminEmail:string) => {
  
  if (! AdminList.includes(adminEmail)){
    throw 'Unauthorized Email';
  }
  
  const url = new URL(
    `https://api.chec.io/v1/categories/${category_id}`
  )



  const headers = {
    "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*" //stop fetch errors

  };



  const res = await fetch(url, {
    method: "DELETE",
    headers: headers,
  })


  const resJSON = await res.json();


  if (!res.ok) {
    throw (JSON.stringify(resJSON.error.message)+JSON.stringify(resJSON.error.errors))
  }

  return resJSON;
}