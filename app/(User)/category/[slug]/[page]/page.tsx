import { Suspense } from "react";
import Item_StoreFront, { Store_Front_Fallback } from "@/app/(User)/(lib)/components/homepage/store_front";
import NextPage, { PageNotFoundComponent } from "@/app/(User)/(lib)/components/browsing/nextPage";
import { fetchItems } from "@/app/(User)/(lib)/api/items";
import { redirect } from "next/navigation";
import { fetchCategories } from "@/app/(User)/(lib)/api/categories";
import { getServerSession } from "next-auth";
import { getFavorites } from "@/app/(User)/(lib)/api/favorites";

export default async function CategoryProducts({params:{slug,page}}:{params:{slug:string,page:number}}) {

    const category_slugs:string[] = [];

    await fetchCategories().then(
        res=>{
            res.map(
                category=>{
                    category_slugs.push(category.slug);
                }
            )
        }
    );

    if (! category_slugs.includes(slug)){
        redirect('/');
    }

    if (! (+page>0) ){
        redirect(`/category/${slug}/1`)
    }
    const limit = 4; 

    const items = await fetchItems({
        "category_slug":`${slug}`,
        "limit":`${limit}`,
        "page":`${Number(page)}`,
        active:"1"

    });


    const nextPageExists = await fetchItems({
        "category_slug":`${slug}`,
        "limit":`${limit}`,
        "page":`${Number(page)+1}`
    })
    .then(result=> result != undefined);


    const email = await getServerSession().then(res=>res?.user?.email);
    
    const favorites:[] = email?await getFavorites(email):[];

 

    if (items&&items.length>0){

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
                            <Item_StoreFront 
                                email={email} favorites={favorites}
                                item={item} key={item.id}/>
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
        return <PageNotFoundComponent goBackURL="/"/>
    }
} 

