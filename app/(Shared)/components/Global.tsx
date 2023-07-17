'use client'

import { ReactNode } from "react"
import { signOut,signIn } from "next-auth/react"


export const CoolButton = ({children}:{children:ReactNode}) => (

    <>
        <div 
            className="
            w-44 h-10 
            flex items-center justify-center
             min-w-fit
            text-slate-700
            bg-slate-300 hover:bg-slate-200
            rounded-md">

            {children}
            
        </div>
    </>
)


export const SignOutButton = () => {


    return(
        <button 
            className="capitalize hover:underline"
            onClick={()=>{signOut()}}>
                sign out
        </button>
    )
}

export const NotLoggedIn = () => {
    return(
        <main>
            You must login to view this content
        </main>
    )
}

