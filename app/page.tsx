import {commerce} from "@/app/(lib)/commerce"
import { Suspense } from "react";
import Store_Front, { Store_Front_Fallback } from "./(lib)/components/homepage/store_front";

export default async function Home() {

  const items = await commerce.products.list({
    limit:20,
  })
  .then(result=> result.data)

  

  return (
    <main>
      <div>

     
     


        <div className="
          flex flex-wrap
          justify-center
          gap-20">

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
