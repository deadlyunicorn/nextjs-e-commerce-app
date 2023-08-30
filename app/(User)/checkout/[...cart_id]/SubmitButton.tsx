'use client'
import { useState } from "react"
import LoadingScreen from "../../loader/page";
import { CoolButton } from "@/app/(Shared)/components/Global";

const SubmitButton = ({fail}:{fail:boolean}) => {

    const [loading,setLoading]=useState(false);

    return(
        <>
        {loading &&
            <LoadingFullscreen/>
        }
        
        <CoolButton>
            <input 
            type="submit"
            onClick={()=>{setLoading(true)}}
            className="
                hover:underline 
                disabled:no-underline
                disabled:cursor-default
                text-lg 
                cursor-pointer 
                
                rounded-md px-2 py-1
                w-fit "
                value={loading?"Loading...":(fail?"Try Again":"Submit")}
            />
        </CoolButton>
        </>

    )
}

export const MockSubmitButton=({fail}:{fail:boolean}) => (
    <CoolButton>
    <input 
        type="submit"
        className="
            hover:underline 
            disabled:no-underline
            disabled:cursor-default
            text-lg 
            cursor-pointer 
            
            rounded-md px-2 py-1
            w-fit "

            value={fail?"Try Again":"Submit"}

        />
        </CoolButton>
)

export default SubmitButton;

export const LoadingFullscreen = () => (
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
)