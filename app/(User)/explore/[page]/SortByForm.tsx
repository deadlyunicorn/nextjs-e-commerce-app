'use client'

import { useState } from "react"
import './form.scss'
import { CoolButton } from "@/app/(Shared)/components/Global";

export const SortByForm = (props:{sortBy:string,sortDirection:string}) => {

    const sortByOptions = ["price","created_at"];
    const sortDirectionOptions = ["asc","desc"];
    
    const [loading,setLoading]=useState(false);
    const [sortBy,setSortBy]=useState(props.sortBy);
    const [sortDirection,setDirection]=useState(props.sortDirection);

    return (
        <div className="flex w-full justify-center relative 2xl:fixed 2xl:top-48 2xl:left-0 rounded-sm 2xl:w-[20vw]">
            <form 
                className="flex flex-col gap-y-2  my-4 items-center bg-white bg-opacity-5 py-2 px-4 w-[250px] h-fit"
                id="sortForm">
                    
                    <div>
                        <label htmlFor="sortBy">Sort by </label>
                        <select
                            value={sortBy}
                            onChange={(e)=>{
                                setSortBy(e.target.value)

                            }}
                            id="sortBy"
                            name="sortBy">
                            {sortByOptions.map(
                                option=>
                                <option
                                    value={option}
                                    // @ts-ignore
                                    key={option}>{queryText.sortBy[option]}</option>
                            )}
                        </select>
                    </div>



                    <div >
                        <select 
                            value={sortDirection}
                            onChange={(e)=>{
                                setDirection(e.target.value)
                            }}
                            id="sortDirection" name="sortDirection">
                            {sortDirectionOptions.map(
                                direction=>
                                    <option 
                                        value={direction}
                                        key={direction}>
                                        {/* @ts-ignore */}
                                        {queryText.sortDirection[sortBy][direction]}
                                    </option>
                            )}
                        </select>
                        <label htmlFor="sortDirection"> first.</label>
                        
                    </div>
                    <CoolButton>
                        <button
                            onClick={()=>{setLoading(true)}} 
                            className="px-2 py-1 w-24">
                            {loading?"Loading..":"Submit"}
                        </button>
                    </CoolButton>

                    


            </form>
        </div>
    )
}

const queryText = {
    sortBy:{
        price:"price",
        created_at:"age"
    },
    sortDirection:{
        price:{
            desc:"more expensive",
            asc:"cheaper"
        },
        created_at:{
            desc:"newer",
            asc:"older"
        }
    }
}