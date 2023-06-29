import {commerce} from "@/app/(lib)/commerce"
import { Suspense } from "react";
import Store_Front, { Store_Front_Fallback } from "@/app/(lib)/components/homepage/store_front";

export default async function CategoryProducts({params:{slug,page}}:{params:{slug:string,page:number}}) {

  const items = await commerce.products.list({
    category_slug:slug,
    limit:20,
    page:page,
  })
  .then(result=> result.data)

    if (items){

        return (
            <main>
            <div>

            
                <p>Page number {page}</p>


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
    else{
        return  (<main>Page not found component</main>)
    }
} 
