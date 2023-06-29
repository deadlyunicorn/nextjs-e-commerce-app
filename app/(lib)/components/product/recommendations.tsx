import { Product } from "@chec/commerce.js/types/product"
import Image from "next/image"
import Link from "next/link"
import "@/app/(lib)/components/mock.scss"


export function Recommendation({listing}:{listing:Product}){
    return (
        
    <Link href={`/product/${listing.permalink}`}
    // dangerous css?
    className=" 
    flex flex-col
    justify-center
    items-center
    w-[110px] rounded-lg
    bg-white bg-opacity-10 
    hover:bg-opacity-20 
    group
    ">

            <Image src={listing.image?listing.image["url"]:"/image.png"}
            placeholder="blur"
            blurDataURL="/image.png"
            alt={listing.name}  height={100} width={100}
            className="rounded-md min-h-[100px] min-w-[100px]" />
            
         <div
            className="flex flex-col justify-between flex-wrap">
            <p className="
                mt-2 min-h-[50px] 
                text-slate-200 group-hover:text-white 
                text-lg font-light">
                {listing.name}
            </p>
            <div>
                <div className="
                    text-lg 
                    bg-gradient-to-r  bg-clip-text
                    from-red-400 to-yellow-300 
                    group-hover:from-red-300 group-hover:to-yellow-200
                    text-transparent">
                    {listing.price["formatted_with_symbol"]}
                    <p className="text-xs">&nbsp;(χωρίς ΦΠΑ)</p>

                </div>
                
            </div>
        </div>


            
        
    </Link>
    )
}

export const Recommendation_Fallback = () => {

    const arr6 = [... new Array(6)];
    
    const MockRecommendations = () =>(

        <div
            className=" 
            w-[110px] 
            bg-white bg-opacity-10 blur-sm
            hover:bg-opacity-20 rounded-lg
            cursor-default
            group 
            ">

            <div>

                <div/>

                <div className="
                    rounded-md
                    h-[100px] w-[100px]
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
                        text-lg text-white
                        font-light text-transparent
                        loading-100
                        bg-gradient-to-r
                        bg-clip-text
                        from-white  to-transparent
                        to-20%
                        blur-md
                        ">
                        Listing are loading..
                    </p>
                </div>
            </div>



            <div>

            <div/>

                <div className="
                    text-lg text-white
                    bg-gradient-to-r 
                    from-red-400 to-yellow-300 
                    group-hover:from-red-300 group-hover:to-yellow-200
                    bg-clip-text text-transparent
                    loading-100
                    to-20%
                    blur-md
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