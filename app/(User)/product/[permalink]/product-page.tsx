import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import Link from "next/link";
import { AddToCart, MockAddToCart } from "@/app/(User)/(lib)/components/cart/add_Cart";
import { Recommendation, Recommendation_Fallback } from "@/app/(User)/(lib)/components/product/recommendations";
import { Suspense } from "react";
import { ProductCollection } from "@chec/commerce.js/features/products";
import PriceTag from "../../(lib)/components/product/priceTag";
import { getCart } from "../../(lib)/api/cart";
import { FavoriteButton } from "../../(lib)/components/browsing/addToFaves";
import { getServerSession } from "next-auth";
import { getFavorites } from "../../(lib)/api/favorites";

const ProductPage = async({product,similar}:{product:Product,similar:ProductCollection["data"]}) =>{


    const email = await getServerSession().then(res=>res?.user?.email);
    
    const favorites:[] = email?await getFavorites(email):[];

 
    //@ts-ignore
    const isFavorite = favorites.includes(product.id);


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
                    <ProductInfo email={email} isFavorite={isFavorite} product={product}/>
                </Suspense>

            </main>

            <aside className="
                rounded-md
                flex gap-x-5 mt-10 px-2
                overflow-x-scroll 
                dark:bg-slate-200 dark:bg-opacity-5
                bg-slate-900 bg-opacity-5

                ">

                <Suspense fallback={<Recommendation_Fallback/>}>

                    {similar //we could splice, but api provides limit..
                    .map((item)=>
                        item.id == product.id ? false
                        :<Recommendation 
                            email={email} 
                            //@ts-ignore
                            isFavorite={favorites.includes(item.id)}
                            listing={item} key={item.id}/>
                    )}

                </Suspense>


                

            </aside>
            
    </>
    )
}

const ProductInfo = async({product,isFavorite,email}:{product:Product,isFavorite:boolean,email:string|undefined|null}) => {
    const cart = await getCart();

    let cartItem=undefined;
    
    if ( cart && cart.line_items.length > 0 ){

        cartItem=cart.line_items.filter((
            line_item=>(line_item.product_id==product.id)
        ))[0]
        
    }

    return(

        <>
        <div 
            className=" 
            relative
            flex flex-wrap
            justify-center
            ">

            <Link 
                href={`/product/${product.permalink}`}>

                <figure
                    className="
                        group
                        flex 
                        flex-col 
                        items-center"
                    >
                    <Image 
                    src={product.image?product.image["url"]:"/image.png"} 
                    alt={product.name}  height={300} width={300}
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

                        {product.name}
                    </figcaption>
                    
                    
                </figure>
                
                
            </Link>
            
            <div 
                    className="
                        bottom-[20%]
                        absolute right-[5%]">

                    <FavoriteButton 
                        isFavorite={isFavorite}
                        email={email} item_id={product.id}/>
                        
            </div>
                    
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
                            {(product.sku&&product.sku!='null')?<span className="text-sm">SKU: {product.sku}</span>:" "}
                        </p>
                        {product.inventory.managed&&
                        <p>
                            {(product.inventory.available>0 && product.inventory.available<15)
                                ?<em className="text-red-600 font-bold underline">Only {product.inventory.available} left</em>
                                :product.inventory.available==0&&<em className="text-red-600 font-bold underline">SOLD OUT</em>}

                        </p>
                        }

               

            </div>

            {
            product.description
                ?<div dangerouslySetInnerHTML={{__html:product.description}}/>
                
                :<p>There is no description for this item.</p>
            }

            <div className="
                pb-2
                gap-y-5
                flex flex-col
                ">

                <PriceTag>
                    <span className="text-4xl">
                        {product.price["formatted_with_symbol"]}
                    </span>
                    
                </PriceTag>

                <div className="
                    gap-y-5
                    flex flex-col">
                    <AddToCart item={product} cartItem={cartItem} price={product.price.raw}/>
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