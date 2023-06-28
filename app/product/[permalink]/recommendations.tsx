import { Product } from "@chec/commerce.js/types/product"
import Image from "next/image"
import Link from "next/link"
import "./slider.scss"

export function Recommendation({listing}:{listing:Product}){
    return (
        
    <Link href={`/product/${listing.permalink}`}
    // dangerous css?
    className=" 
    flex flex-col
    justify-center
    items-center
    w-[110px] bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg
    ">

            <Image src={listing.image?listing.image["url"]:""} 
            alt={'aa'}  height={100} width={100}
            className="rounded-md h-[100px] w-[100px]" />
            
         <div
            className="flex flex-col justify-between flex-wrap">
            <p className="mt-2 min-h-[50px] text-lg text-white font-light">
                {listing.name}
            </p>
            <div>
                <div className="
                    text-lg 
                    bg-gradient-to-r from-red-400 to-yellow-300 bg-clip-text text-transparent">
                    {listing.price["formatted_with_symbol"]}
                    <p className="text-xs">&nbsp;(χωρίς ΦΠΑ)</p>

                </div>
                
            </div>
        </div>


            
        
    </Link>
    )
}