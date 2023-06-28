import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/lib/components/button";
import { Recommendation, Recommendation_Fallback } from "@/app/lib/components/product/recommendations";
import { Suspense } from "react";

const ProductPage = ({listing,similar}:{listing:Product,similar:Product[]}) =>{

    const arr6 = [... new Array(6)];

    return(
    <>
        <main 
            className="
            flex flex-wrap 
            justify-evenly 
            border-4 border-red-700">
            
                <Suspense fallback={<ProductFallback/>}>
                    <ProductInfo listing={listing}/>
                </Suspense>

            </main>

            <aside className="
                flex gap-x-5 mt-10 
                overflow-x-scroll 
                border-4 border-red-700">

                <Suspense fallback={<Recommendation_Fallback/>}>

                    {similar.map((item)=>
                        <Recommendation listing={item} key={item.id}/>
                    )}

                </Suspense>


                

            </aside>
            
    </>
    )
}

const ProductInfo = ({listing}:{listing:Product}) => (
    <>
        <div 
                // dangerous css?
                className=" 
                max-w-[200px] 
                min-w-[300px] 
                flex flex-wrap
                justify-center
                ">

                    <Link 
                        href={`/product/${listing.permalink}`}>

                        <Image 
                            src={listing.image?listing.image["url"]:"/image.png"} 
                        alt={listing.name}  height={300} width={300}
                        placeholder="blur"
                        blurDataURL="/image.png"

                        className="rounded-md h-[300px]" />
                        
                        
                    </Link>
                     <div className="
                        flex flex-col 
                        justify-between flex-wrap">
                        
                        <p className="
                            my-4 min-h-[50px]
                            text-4xl
                            text-slate-200 hover:text-white
                            font-light">

                                {listing.name}
                        </p>

                        <div className="flex flex-col-reverse">
                            
                            {/* peer should be before sibling */}
                            <div className="peer">
                                <Button link={listing.checkout_url.checkout}/>
                            </div>

                            <div className="
                                text-2xl
                                bg-gradient-to-r 
                                from-red-400 to-yellow-300 
                                peer-hover:from-red-300 peer-hover:to-yellow-200
                                bg-clip-text text-transparent">

                                {listing.price["formatted_with_symbol"]}

                                <span className="text-xs">
                                    &nbsp;(χωρίς ΦΠΑ)
                                </span>
                            
                            </div>
                            
                        </div>
                    </div>

            
                        
                    
                </div>
                
                <div className="
                    text-white 
                    text-xl font-light 
                    w-[300px] min-h-[150px] pt-10 ">
                {
                    listing.description?
                        <div dangerouslySetInnerHTML={{__html:listing.description}}/>
                        :
                        <p>No description found</p>
                }
                </div>
    </>
)

const ProductFallback = () => (
    <>
        <div 
            // dangerous css?
            className=" 
            max-w-[200px] 
            min-w-[300px] 
            flex flex-wrap
            justify-center
            ">


            
                    <div className="
                        bg-white
                        blur-md 
                        loading-300
                        bg-gradient-to-r
                        from-slate-200  to-transparent
                        h-[300px] w-[300px]"/>
                    
                    
                     <div className="
                        flex flex-col 
                        justify-between flex-wrap">
                        
                        <p className="
                            my-4 min-h-[50px]
                            text-4xl
                            text-transparent
                            bg-clip-text loading
                            font-light">

                                The product is loading...
                        </p>

                        <div className="flex flex-col-reverse">
                            
                            {/* peer should be before sibling */}

                            <div className="
                                text-white
                                loading-300 blur-md
                                text-2xl
                                bg-gradient-to-r 
                                from-red-400 to-yellow-300 
                                peer-hover:from-red-300 peer-hover:to-yellow-200
                                bg-clip-text text-transparent">

                                This is a test price

                                <span className="">
                                    &nbsp;(χωρίς ΦΠΑ)
                                </span>
                            
                            </div>
                            
                        </div>
                    </div>

            
                        
                    
                </div>
                
                <div className="
                    text-white 
                    text-xl font-light 
                    w-[300px] pt-10 loading-300 
                    blur-sm 
                    bg-gradient-to-r 
                    from-transparent to-white
                    bg-clip-text text-transparent ">

                        This is a template description
                </div>
    </>
)

export default ProductPage;