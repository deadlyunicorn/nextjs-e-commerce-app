import { Product } from "@chec/commerce.js/types/product"
import Image from "next/image"
import Link from "next/link"
import "@/app/lib/components/mock.scss"


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

            <Image src={listing.image?listing.image["url"]:""} 
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
            bg-white bg-opacity-10
            hover:bg-opacity-20 rounded-lg
            cursor-default
            group 
            mock_product_100 
            backdrop-blur-sm blur-sm
            ">

            <div>

                <div/>

                <div className="
                    rounded-md 
                    h-[100px] w-[100px]
                    bg-white
                " />
            </div>

            <div>

                 <div/>

                <div>
                    <p className="
                        mt-2 min-h-[50px]
                        text-lg text-white
                        font-light">
                        Test this cool Listing
                    </p>
                </div>
            </div>



            <div>

            <div/>

                <div className="
                    text-lg 
                    bg-gradient-to-r 
                    from-red-400 to-yellow-300 
                    group-hover:from-red-300 group-hover:to-yellow-200
                    bg-clip-text text-transparent">
                    Test Price

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