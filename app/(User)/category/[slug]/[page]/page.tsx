import { Suspense } from "react";
import Item_StoreFront, { Store_Front_Fallback } from "@/app/(User)/(lib)/components/homepage/store_front";
import NextPage, { PageNotFoundComponent } from "@/app/(User)/(lib)/components/browsing/nextPage";
import { fetchItems } from "@/app/(User)/(lib)/api/items";
import { redirect } from "next/navigation";

export default async function CategoryProducts({params:{slug,page},params}:{params:{slug:string,page:number}}) {


    if (! (+page>0) ){
        redirect('/explore ')
    }
    const limit = 20; 

    const items = await fetchItems({
        "category_slug":`${slug}`,
        "limit":`${limit}`,
        "page":`${Number(page)}`

    });


    const nextPageExists = await fetchItems({
        "category_slug":`${slug}`,
        "limit":`${limit}`,
        "page":`${Number(page)+1}`
    })
    .then(result=> result != undefined);
 

    if (items){

        return (
            <>
            <main>
            <div>


                <div className="
                product-list-div">

                <Suspense fallback={<Store_Front_Fallback/>}>
                
                    {items.map(
                        (item,index)=>(
                        // <Store_Front_Fallback key={index}/>
                            (!item.inventory.managed||item.inventory.available>0)&&
                            <Item_StoreFront item={item} key={item.id}/>
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
        return <PageNotFoundComponent/>
    }
} 

