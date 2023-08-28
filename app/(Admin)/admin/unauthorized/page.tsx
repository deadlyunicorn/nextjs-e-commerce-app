"use client"

import { useRouter } from "next/navigation"

export default function Unauthorized() {
    
    const router = useRouter();
    return(
            <div className="
                
                mb-96
                rounded-md py-2 text-lg
                dark:bg-white
                dark:bg-opacity-10
                bg-slate-200
                [&>*]:my-4 
                w-full

                mt-[5vh] 
                xl:max-w-4xl 
                md:max-w-3xl
                text-center xs:px-5
                max-w-[100%]

                flex flex-col flex-wrap
                items-center
                ">

                <div>
                    <span 
                    className="
                        text-center bg-red-500 text-white
                        dark:bg-red-600 
                        px-2 py-1 rounded-md">
                            Unauthorized (Not logged in)
                    </span>
                    
                </div>

                <div className="flex gap-x-4 text-white">

                <button className="w-fit
                    mt-2
                    dark:bg-blue-800
                    dark:hover:bg-blue-700
                    hover:bg-blue-500
                    bg-blue-600 rounded-md px-1"
                    onClick={()=>{
                        
                        // @ts-ignore
                        router.back()
                    }}>
                        Back
                    </button>

                    

                    <button className="w-fit
                    mt-2
                    dark:bg-blue-800
                    dark:hover:bg-blue-700
                    hover:bg-blue-500
                    bg-blue-600 rounded-md px-1"
                    onClick={()=>{
                        
                        // @ts-ignore
                        router.replace("/admin")
                    }}>
                        Homepage
                    </button>

                   

                </div>

            </div>
    )
}
