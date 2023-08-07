import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import Link from "next/link";
import { AddToCart, MockAddToCart } from "@/app/(User)/(lib)/components/cart/add_Cart";
import { Recommendation, Recommendation_Fallback } from "@/app/(User)/(lib)/components/product/recommendations";
import { Suspense } from "react";
import { ProductCollection } from "@chec/commerce.js/features/products";
import PriceTag from "../../(lib)/components/product/priceTag";
import { getCart } from "../../(lib)/api/cart";

const ProductPage = ({listing,similar}:{listing:Product,similar:ProductCollection["data"]}) =>{

    return(
    <>
        <main 
            className="
            py-2 rounded-md
            flex flex-wrap 
            justify-evenly 
            dark:bg-slate-200 dark:bg-opacity-5
            bg-slate-900 bg-opacity-5
            ">
            
                <Suspense fallback={<ProductFallback/>}>
                    <ProductInfo listing={listing}/>
                </Suspense>

            </main>

            <aside className="
                rounded-md
                flex gap-x-5 mt-10 
                overflow-x-scroll 
                dark:bg-slate-200 dark:bg-opacity-5
                bg-slate-900 bg-opacity-5

                ">

                <Suspense fallback={<Recommendation_Fallback/>}>

                    {similar //we could splice, but api provides limit..
                    .map((item)=>
                        item.id == listing.id ? false
                        :<Recommendation listing={item} key={item.id}/>
                    )}

                </Suspense>


                

            </aside>
            
    </>
    )
}

const ProductInfo = async({listing}:{listing:Product}) => {
    const cart = await getCart();

    let cartItem=undefined;
    
    if ( cart && cart.line_items.length > 0 ){

        cartItem=cart.line_items.filter((
            line_item=>(line_item.product_id==listing.id)
        ))[0]
        
    }

    return(

        <>
        <div 
            className=" 
            flex flex-wrap
            justify-center
            ">

            <Link 
                href={`/product/${listing.permalink}`}>

                <figure
                    className="
                        group
                        flex 
                        flex-col 
                        items-center"
                    >
                    <Image 
                    src={listing.image?listing.image["url"]:"/image.png"} 
                    alt={listing.name}  height={300} width={300}
                    placeholder="blur"
                    blurDataURL="/image.png"
                    className="
                        rounded-md aspect-square 
                        group-hover:brightness-110
                        max-w-[100%]" />

                    <figcaption className="
                        mt-4 min-h-[50px]
                        text-4xl
                        group-hover:text-slate-600 
                        dark:group-hover:text-slate-50 
                        font-light">

                        {listing.name}
                    </figcaption>
                    
                    
                </figure>
                
                
            </Link>
                    
        </div>
        
        <div className="
            justify-between 
            flex-wrap
            flex flex-col
            text-xl font-light 
            w-[300px] min-h-[150px] pt-2 ">

            <div className="
                flex flex-col 
                justify-between 
                py-2">

                        <p>
                            {listing.sku?<span className="text-sm">SKU: {listing.sku}</span>:" "}
                        </p>
                        {listing.inventory.managed&&
                        <p>
                            {(listing.inventory.available>0 && listing.inventory.available<15)
                                ?<em className="text-red-600 font-bold underline">Only {listing.inventory.available} left</em>
                                :<em className="text-red-600 font-bold underline">SOLD OUT</em>}

                        </p>
                        }
               

            </div>

            {
            listing.description
                ?<div dangerouslySetInnerHTML={{__html:listing.description}}/>
                
                :<p>There is no description for this item.</p>
            }

            <div className="
                pb-2
                gap-y-5
                flex flex-col
                ">

                <PriceTag>
                    <span className="text-4xl">
                        {listing.price["formatted_with_symbol"]}
                    </span>
                    
                </PriceTag>

                <div className="
                    gap-y-5
                    flex flex-col">
                    <AddToCart item={listing} cartItem={cartItem} price={listing.price.raw}/>
                </div>

                

            </div>

            
        </div>

    </>
    )
}

export const ProductFallback = () => (
    <>
        <div 
            // dangerous css?
            className=" 
            product-list-div
        ">

            <div className="
                        bg-white
                        bg-opacity-5
                        blur-md 
                        loading-300
                        bg-gradient-to-r
                        from-slate-200  to-transparent
                        h-[300px] aspect-square"/>
                
                
                    
        </div>
        
        
        <div className="
            blur-md
            justify-between 
            flex-wrap
            flex flex-col
            text-xl font-light 
            w-[300px] min-h-[150px] pt-2 ">

            <div className="
                flex flex-col 
                justify-between 
                py-2">

                        <p>
                            SKU: COOLNUM
                        </p>

            </div>

            {
                <p>There is no description for this item.</p>
            }

            <div className="
                pb-2
                gap-y-5
                flex flex-col
                ">

                

                <div className="
                    gap-y-5
                    flex flex-col">
                    <MockAddToCart/>
                </div>

                <PriceTag>
                    <span className="text-4xl">
                    € 22.00
                    </span>
                    
                </PriceTag>

            </div>
        </div>
    </>
               
)

export default ProductPage;