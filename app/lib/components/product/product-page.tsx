import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/lib/components/button";
import { Recommendation, Recommendation_Fallback } from "@/app/lib/components/product/recommendations";

const ProductPage = ({listing,similar}:{listing:Product,similar:Product[]}) =>{

    const arr6 = [... new Array(6)];

    return(
    <>
        <main 
            className="
            flex flex-wrap 
            justify-evenly 
            border-4 border-red-700">
            
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
                            src={listing.image?listing.image["url"]:""} 
                        alt={listing.name}  height={300} width={300}
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

                        <div>
                            <span className="
                                text-2xl
                                bg-gradient-to-r 
                                from-red-400 to-yellow-300 
                                hover:from-red-300 hover:to-yellow-200
                                bg-clip-text text-transparent">

                                {listing.price["formatted_with_symbol"]}

                                <span className="text-xs">
                                    &nbsp;(χωρίς ΦΠΑ)
                                </span>
                            
                            </span>
                            <Button link={listing.checkout_url.checkout}/>
                        </div>
                    </div>

            
                        
                    
                </div>
                
                <div className="
                    text-white 
                    text-xl font-light 
                    w-[300px] pt-10 ">
                {
                    listing.description?
                        <div dangerouslySetInnerHTML={{__html:listing.description}}/>
                        :
                        <p>No description found</p>
                }
                </div>
            </main>

            <aside className="
                flex gap-x-5 mt-10 
                overflow-x-scroll 
                border-4 border-red-700">

                {similar.map((item)=>
                    <Recommendation listing={item} key={item.id}/>
                )}

                <Recommendation_Fallback/>

            </aside>
            
    </>
    )
}

export default ProductPage;