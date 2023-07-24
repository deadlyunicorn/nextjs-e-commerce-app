
export default function ErrorPage ({reset}:{reset:()=>void}) {
    return(
            <div className="
                
                mb-96
                rounded-md py-2 text-lg
                dark:bg-slate-950
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
                        px-2 py-1 rounded-md">
                            Something went wrong...
                    </span>
                    
                </div>

                <div className="flex gap-x-4 text-white">

                    <button 
                        
                        className="
                        w-fit
                        mt-2

                        

                        hover:bg-blue-500
                        bg-blue-600 rounded-md px-1"
                        onClick={()=>{
                        
                        reset()// 
                        
                        //we may also need to trigger a refresh..
                        //but not on the current path.
                        //Link might be okay?
                        //idk i think i had an error..

                    }}>
                        Retry
                    </button>

                    <button className="w-fit
                    mt-2
                    hover:bg-blue-500
                    bg-blue-600 rounded-md px-1"
                    onClick={()=>{
                        
                        // @ts-ignore
                        window.location="/" 
                    }}>
                        Homepage
                    </button>

                </div>

            </div>
    )
}
