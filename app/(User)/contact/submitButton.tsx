'use client'
import { useState } from "react"
import LoadingScreen from "../loader/page";

export const SubmitContactButton = ({fail}:{fail:boolean}) => {

    const [loading,setLoading]=useState(false);

    return(
        <>
        {loading &&
        <div className="
        
        bg-slate-200 bg-opacity-20
        dark:bg-slate-950 dark:bg-opacity-20 
        backdrop-blur-md
        fixed z-20 
        top-0 left-0 
        w-screen h-screen">
            <div className="flex flex-col h-full justify-center">
                <LoadingScreen/>
            </div>
        </div>
        }
        
        <input 
        type="submit"
        onClick={()=>{setLoading(true)}}
        className="
        hover:cursor-pointer
        h-10 px-2 py-1 
        rounded-md 
        dark:hover:bg-black 
        dark:bg-slate-950
        bg-slate-200
        hover:bg-white"
            value={loading?"Loading...":(fail?"Try Again":"Submit")}
            />
        </>

    )
}

export const MockSubmitButton=({fail}:{fail:boolean}) => (
    <input 
        type="submit"
        className="
        hover:cursor-pointer
        h-10 px-2 py-1 
        rounded-md 
        dark:hover:bg-black 
        dark:bg-slate-950
        bg-slate-200
        hover:bg-white"

            value={fail?"Try Again":"Submit"}

        />
)
