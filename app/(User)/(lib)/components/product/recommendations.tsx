import { Product } from "@chec/commerce.js/types/product"
import Image from "next/image"
import Link from "next/link"
import "@/app/(User)/(lib)/styles/mock.scss"
import { FavoriteButton } from "../browsing/addToFaves"


export function Recommendation({listing,email,isFavorite}:{listing:Product,email:string|undefined|null,isFavorite:boolean}){
    return (

    
    <div className="relative">
    <Link href={`/product/${listing.permalink}`}
    // dangerous css?
    className=" 
    flex flex-col
    justify-around
    items-center
    w-[110px] h-[250px] rounded-lg
    bg-slate-200
    dark:bg-slate-50 dark:bg-opacity-10 
    dark:hover:bg-opacity-20 
    group
    ">

        <div className="relative">

            <Image src={listing.image?listing.image["url"]:"/image.png"}
            placeholder="blur"
            blurDataURL="/image.png"
            alt={listing.name}  height={100} width={100}
            className="
                mt-4
                bg-white
                rounded-md min-h-[100px] min-w-[100px] aspect-square" />

            {listing.inventory.managed
                &&(listing.inventory.available>0 && listing.inventory.available<10)
                ?
                <p className="
                    font-bold
                    text-red-600
                    bg-slate-200 bg-opacity-40
                    backdrop-blur-md
                    absolute bottom-2 
                    w-full">
                    
                    Only {listing.inventory.available} left
                </p>
                :listing.inventory.available==0 && 
                <p className="
                font-bold
                text-red-600
                bg-slate-200 bg-opacity-40
                backdrop-blur-md
                absolute bottom-2 
                w-full">
                
                    SOLD OUT
                </p>
            }
        </div>
                
        <div
            className="
                flex flex-col 
                justify-between h-full
                flex-wrap 
                overflow-x-hidden w-full">

            <p className="
                overflow-hidden
                mt-2 h-[50px] 
                text-slate-900 group-hover:text-slate-600
                dark:text-slate-200 dark:group-hover:text-slate-50 
                text-lg font-light">
                {listing.name}
            </p>
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

            </div>
            
        </div>


            
        
    </Link>
    <div className="absolute top-2">

        <FavoriteButton 
            isFavorite={isFavorite}
            item_id={listing.id} email={email}/>
    </div>
    </div>
    )
}

export const Recommendation_Fallback = () => {

    const arr6 = [... new Array(12)];
    
    const MockRecommendations = () =>(

        <div
            className=" 
             
            flex flex-col
            justify-around
            items-center
            h-[250px]
            w-[110px]
            dark:bg-slate-50 dark:bg-opacity-10 
            dark:hover:bg-opacity-20 
            group
    
            bg-white bg-opacity-10 
            blur-sm
            hover:bg-opacity-20 rounded-lg
            cursor-default
            group 
            ">

                <div className="
                    mt-4
                    min-h-[100px] min-w-[100px]
                    rounded-md
                    aspect-square
                    bg-slate-300
                    loading-100
                    bg-gradient-to-r
                    from-white  to-transparent
                    to-20%
                    bg-opacity-20
                    blur-sm
                " />
                
                <div
            className="
            flex flex-col 
            justify-between 
            flex-wrap h-full
            overflow-x-hidden w-full">
                <p className="
                    mt-2 min-h-[50px] 
                    text-slate-900 group-hover:text-slate-600
                    dark:text-slate-200 dark:group-hover:text-slate-50 
                    text-lg font-light">
                    Cool Product
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
                            €XX.00

                    </div>
                
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