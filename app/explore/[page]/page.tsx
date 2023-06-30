import {commerce} from "@/app/(lib)/api/commerce"
import { Suspense } from "react";
import Store_Front, { Store_Front_Fallback } from "@/app/(lib)/components/homepage/store_front";
import NextPage from "@/app/(lib)/components/browsing/nextPage";
import { fetchItems } from "@/app/(lib)/api/items";

export default async function Explore({params:{page}}:{params:{page:number}}) {


    const limit = 1; 


    const items = await fetchItems({
        "limit":`${limit}`,
        "page":`${Number(page)}`

    });

    const nextPageExists = await fetchItems({
        "limit":`${limit}`,
        "page":`${Number(page)+1}`
    })
    .then(result=> result != undefined);

    
    if (items){

        return (
            <>
            <main>
            <div>

            
                <p>Page number {page}</p>


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

            <NextPage currentPage={Number(page)} nextPageExists={nextPageExists}/>
            </>

        )
    }
    else{
        return  (<main>Page not found component</main>)
    }
} 
