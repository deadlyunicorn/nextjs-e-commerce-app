import {items} from "@/app/lib/commerce"
import { Suspense } from "react";
import Store_Front, { Store_Front_Fallback } from "./lib/components/homepage/store_front";

export default async function Home() {

  

  return (
    <main>
      <div>

     
     


        <div className="flex gap-20 flex-wrap">

          <Suspense fallback={<Store_Front_Fallback/>}>
           
            {items.map(
                (item)=>(
                  <Store_Front item={item} key={item.id}/>
                )
              )}

          </Suspense>
        </div>

      </div>
    </main>

  )
} 
