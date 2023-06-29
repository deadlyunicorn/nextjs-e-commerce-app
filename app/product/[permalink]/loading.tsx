import { ProductFallback } from "@/app/(lib)/components/product/product-page";
import { Recommendation_Fallback } from "@/app/(lib)/components/product/recommendations";

export default function ProductLoader(){

    return(
        <>
        <main 
            className="
            flex flex-wrap 
            justify-evenly 
            border-4 border-red-700">
            
                <ProductFallback/>
              

            </main>

            <aside className="
                flex gap-x-5 mt-10 
                overflow-x-scroll 
                border-4 border-red-700">

                <Recommendation_Fallback/>

            </aside>
            
    </>
    )
}