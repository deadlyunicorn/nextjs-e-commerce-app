import { Store_Front_Fallback } from "./(lib)/components/homepage/store_front";

export default function Loader(){
    return(
        <div className="
          flex flex-wrap
          justify-center
          gap-20">

              <Store_Front_Fallback/>
        </div>
    )
}