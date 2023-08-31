import { Suspense } from "react";
import Item_StoreFront, { Store_Front_Fallback } from "@/app/(User)/(lib)/components/homepage/store_front";
import NextPage, { NextPageWithQuery, PageNotFoundComponent } from "@/app/(User)/(lib)/components/browsing/nextPage";
import { fetchItems } from "@/app/(User)/(lib)/api/items";
import Link from "next/link";
import { CoolLink } from "@/app/(Shared)/components/Global";
import { redirect } from "next/navigation";
import { SortByForm } from "./SortByForm";
import { getServerSession } from "next-auth";
import { getFavorites } from "../../(lib)/api/favorites";

export default async function Explore(
        {params:{page},
        searchParams}
        :{params:{page:number},
        searchParams:{
            sortBy:string,sortDirection:string,
            min:string|undefined, max:string|undefined
        }}
    
    ) {

    const email = await getServerSession().then(res=>res?.user?.email);

    if (! (+page>0) ){
        redirect('/explore/1?sortBy=created_at&sortDirection=desc')
    }


    const sortByOptions = ["price","created_at"];
    const sortDirectionOptions = ["asc","desc"];

    if (
        ( ! ( Object.entries(searchParams).length == 2 || Object.entries(searchParams).length == 4))
        || searchParams.sortBy == "" 
        || searchParams.sortDirection == ""
        || !sortByOptions.includes(searchParams.sortBy)
        || !sortDirectionOptions.includes(searchParams.sortDirection)
        ){
         
        redirect(`/explore/1?sortBy=created_at&sortDirection=desc`)
    }
    const limit = 5;

    const maxValuePromise = fetchItems({
        "limit":`1`,
        "sortBy":"price",
        "sortDirection":"desc",
        "active":"1",
    }).then(res=>res[0].price.raw);


    const minValuePromise = fetchItems({
        "limit":`1`,
        "sortBy":"price",
        "sortDirection":"asc",
        "active":"1"
    }).then(res=>res[0].price.raw);


    const itemsPromise = fetchItems({
        "limit":`${limit}`,
        "sortBy":searchParams.sortBy,
        "sortDirection":searchParams.sortDirection,
        "active":"1",
        "page":`${Number(page)}`,
    }).then(products=>products.filter( //sadly the API's price.below/above wasn't working for this, so I am doing it manually..
        //pagination won't work correctly when using range.
          product=>( 
            product.price.raw > (searchParams.min?+searchParams.min:0) 
            && product.price.raw < (searchParams.max? +searchParams.max:9999) )
    ));

    
    const nextPageExistsPromise = fetchItems({
        "limit":`${limit}`,
        "sortBy":searchParams.sortBy,
        "sortDirection":searchParams.sortDirection,
        "active":"1",
        "page":`${Number(page)+1}`,
    })
    .then(result=> (
        result != undefined 
        && result.length > 0 
        && result.filter( //sadly the API's price.below/above wasn't working for this, so I am doing it manually..
        //pagination won't work correctly when using range.
            product=>( 
                product.price.raw > (searchParams.min?+searchParams.min:0) 
                && product.price.raw < (searchParams.max? +searchParams.max:9999) )
        ).length>0
    ));

    const favoritesPromise = email?getFavorites(email):[];

    const [items,nextPageExists] = await Promise.all([itemsPromise,nextPageExistsPromise])


    const favorites:string[] = email?await favoritesPromise:[];

    const [minimumProductPrice,priceLimit] = await Promise.all([minValuePromise,maxValuePromise]);

    
    if (items&&items.length>0){

        return (
            <>
            <main>

                <div className="
                product-list-div">

                <Suspense fallback={<Store_Front_Fallback/>}>
                
                    {items.map(
                        (item,index)=>(
                        (!item.inventory.managed||item.inventory.available>0)&&
                        // <Store_Front_Fallback key={index}/>
                        <Item_StoreFront 
                            email={email} favorites={favorites}
                            item={item} key={item.id}/>
                        )
                    )}

                </Suspense>
                </div>

            </main>


            <NextPageWithQuery 
                currentPage={Number(page)} 
                nextPageExists={nextPageExists}
                
                searchQuery={`?sortBy=${searchParams.sortBy}&sortDirection=${searchParams.sortDirection}&min=${searchParams.min||''}&max=${searchParams.max||''}`}/>
            <SortByForm 

                prevMax={ searchParams.max?+searchParams.max:priceLimit}
                prevMin={ searchParams.min?+searchParams.min:minimumProductPrice}
                minimumProductPrice={minimumProductPrice}
                priceLimit={priceLimit}

                sortBy={searchParams.sortBy} sortDirection={searchParams.sortDirection}/>
            </>

        )
    }
    else{
        return  <PageNotFoundComponent goBackURL="/explore"/>
    }
} 
