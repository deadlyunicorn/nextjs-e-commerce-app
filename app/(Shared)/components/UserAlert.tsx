import { ReactNode } from "react"

export const FailureMessage = ({error}:{error:string}) => {

    return (
        <CasualSpan>
            <div className="
            bg-opacity-60
            dark:bg-opacity-60

            dark:bg-red-600
            bg-red-300 
            
            text-slate-900
            dark:text-slate-200
            py-5 
            rounded-md md:rounded-none ">
                Failed: {error}
            </div>
        </CasualSpan>
        
    )
}


export const SuccessMessage = ({message}:{message:string}) => {

    return (
        <CasualSpan>
            <div className="
                dark:bg-opacity-60
                dark:bg-green-600
                bg-green-300
                text-slate-900
                dark:text-slate-200
                bg-opacity-60

                py-5 
                rounded-md md:rounded-none">
                {message}
            </div>
        </CasualSpan>
    )
}

const CasualSpan = ({children}:{children:ReactNode}) => (

// On mobile fixed will not work as expected (the component might be behind browser navbar..)
        <div className="
            z-30
            rounded-md
            bottom-0 left-0 
            absolute w-full
            md:fixed md:w-[100vw]
            backdrop-blur-md
            text-center
            disappear 
            "> 
            {children}
        </div>

)