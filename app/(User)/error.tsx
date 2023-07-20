'use client'
import Link from "next/link";
import {  useRouter } from "next/navigation";

interface ErrorType{
    [key:string]:string;

}

export default function Error ({error,reset}:{error:ErrorType,reset:()=>void}) {
    const router = useRouter();
    return(
            <div className="
                
                mb-96
                rounded-md py-2 text-lg
                 bg-white
                [&>*]:my-4
                 ">

                <div>
                    <span 
                    className="
                        text-center bg-red-500 
                        px-2 py-1 rounded-md">
                        An error has occured: {JSON.stringify(error)}
                    </span>
                    
                </div>
                <p className="text-black">
                    Page may not exist.
                </p>

                <button 
                
                className="
                mt-2
                bg-blue-600 rounded-md px-1"
                onClick={()=>{
                    
                    router.replace("/");
                    window.location.reload(); //maybe replace with redirect('./')??

                    // reset()// 
                    
                    //we may also need to trigger a refresh..
                    //but not on the current path.
                    //Link might be okay?
                    //idk i think i had an error..

                }}>
                    Reload
                </button>
            </div>
    )
}
