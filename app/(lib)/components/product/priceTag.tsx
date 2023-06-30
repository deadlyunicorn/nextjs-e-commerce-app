import { ReactNode } from "react";

export default function PriceTag({children}:{children:ReactNode}){

    return(
        <div className="
            price-tag-multiple
            bg-gradient-to-r 
            from-red-400 to-yellow-300 
            peer-hover:from-red-300 peer-hover:to-yellow-200
            bg-clip-text text-transparent">

        {children}

        <span className="text-xs">
            (χωρίς&nbsp;ΦΠΑ)
        </span>

    </div>
    );
}