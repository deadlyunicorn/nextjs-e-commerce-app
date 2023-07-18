'use client'

import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

export default function SortBy({currentSort}:{currentSort:string}) {
    
    const [sortBy,setSortBy]=useState(currentSort);
    const [hasMounted,setHasMounted]=useState(false);
    const sortOptions = ["created_at","updated_at","id","sort_order", "name", "price"]
   
    useEffect(()=>{
        if(hasMounted){
            redirect(sortBy);
        }
        setHasMounted(true);

    },[sortBy])


    
    
    return(
    <div>
            Sort by :
            <select
                value={sortBy}
                onChange={(e)=>{
                    setSortBy(e.target.value)
                }}
                className="
                    bg-slate-200
                    dark:bg-slate-900
                    text-inherit">
                {sortOptions.map(option=>
                    <option 
                        key={option}>{option}
                    </option>
                    )}
            </select>
            
    </div>
    )
}