import { Product } from "@chec/commerce.js/types/product"
import Image from "next/image"
import Link from "next/link"
import "@/app/(lib)/styles/mock.scss"


export function Recommendation({listing}:{listing:Product}){
    return (
        
    <Link href={`/product/${listing.permalink}`}
    // dangerous css?
    className=" 
    flex flex-col
    justify-center
    items-center
    w-[110px] rounded-lg
    bg-slate-200
    dark:bg-slate-50 dark:bg-opacity-10 
    dark:hover:bg-opacity-20 
    group
    ">

            <Image src={listing.image?listing.image["url"]:"/image.png"}
            placeholder="blur"
            blurDataURL="/image.png"
            alt={listing.name}  height={100} width={100}
            className="rounded-md min-h-[100px] min-w-[100px] aspect-square" />
            
         <div
            className="
                flex flex-col 
                justify-between 
                flex-wrap 
                overflow-x-hidden w-full">
            <p className="
                mt-2 min-h-[50px] 
                text-slate-900 group-hover:text-slate-600
                dark:text-slate-200 dark:group-hover:text-slate-50 
                text-lg font-light">
                {listing.name}
            </p>
            <div>
                <div className="
                    price-tag-multiple

                    bg-gradient-to-r  bg-clip-text
                    from-red-500 to-yellow-500 
                    group-hover:from-red-400 group-hover:to-yellow-400

                    dark:from-red-400 dark:to-yellow-300 
                    dark:group-hover:from-red-300 dark:group-hover:to-yellow-200
                    text-transparent
                    ">
                    {listing.price["formatted_with_symbol"]}
                    <p className="text-xs">&nbsp;(χωρίς ΦΠΑ)</p>

                </div>
                
            </div>
        </div>


            
        
    </Link>
    )
}

export const Recommendation_Fallback = () => {

    const arr6 = [... new Array(12)];
    
    const MockRecommendations = () =>(

        <div
            className=" 
            bg-white bg-opacity-10 blur-sm
            hover:bg-opacity-20 rounded-lg
            cursor-default
            group 
            ">

            <div>

                <div/>

                <div className="
                    rounded-md
                    aspect-square
                    bg-slate-300
                    loading-100
                    bg-gradient-to-r
                    from-white  to-transparent
                    to-20%
                    blur-md
                " />
            </div>

            <div>

                 <div/>

                <div>
                    <p className="
                        mt-2 min-h-[50px]
                        text-lg 
                        font-light text-transparent
                        loading-100
                        bg-gradient-to-r
                        bg-clip-text
                        from-white  to-transparent
                        to-20%
                        blur-md
                        ">
                        Listing is loading..
                    </p>
                </div>
            </div>



            <div>

            <div/>

                <div className="
                    bg-gradient-to-r 
                    from-red-400 to-yellow-300 
                    group-hover:from-red-300 group-hover:to-yellow-200
                    bg-clip-text text-transparent
                    loading-100
                    to-20%
                    blur-md
                    price-tag-multiple

                    ">
                    Price is loading..

                    <p className="text-xs">&nbsp;
                        (χωρίς ΦΠΑ)
                    </p>

                </div>

            </div>

                        


                
            
        </div>
    );

    return (
        arr6.map((i,index)=>{
            return <MockRecommendations key={index} />
        })
    )



}