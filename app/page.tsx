import {commerce} from "@/app/(lib)/api/commerce"
import { Suspense } from "react";
import Store_Front, { Store_Front_Fallback } from "./(lib)/components/homepage/store_front";
import { ProductCollection } from "@chec/commerce.js/features/products";
import { Product } from "@chec/commerce.js/types/product";
import { fetchItems } from "./(lib)/api/items";



export default async function Home() {

  const limit = 20;

  const items = await fetchItems({
    "limit":`${limit}`,
  });


  return (
    <main>
      <div>

     
     


        <div className="
          product-list-div">

          <Suspense fallback={<Store_Front_Fallback/>}>
           
            {items.map(
                (item,index)=>(
                  // <Store_Front_Fallback key={index}/>
                  <Store_Front item={item} key={item.id}/>
                )
              )}

          </Suspense>
        </div>

      </div>
    </main>

  )
} 
