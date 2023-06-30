import { ProductFallback } from "@/app/(lib)/components/product/product-page";
import { Recommendation_Fallback } from "@/app/(lib)/components/product/recommendations";

export default function ProductLoader(){

    return(
        <>
        <main 
            className="
            flex flex-wrap 
            justify-evenly">
            
                <ProductFallback/>
              

            </main>

            <aside className="
                flex gap-x-5 mt-10 
                overflow-x-scroll">

                <Recommendation_Fallback/>

            </aside>
            
    </>
    )
}