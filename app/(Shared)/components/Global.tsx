'use client'

import { ReactNode } from "react"
import { signOut,signIn } from "next-auth/react"


export const CoolButton = ({children}:{children:ReactNode}) => (

    <>
        <div 
            className="
            flex items-center justify-center
            w-fit
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
            
            className="
            h-10
            capitalize hover:underline"
            onClick={()=>{signOut()}}>
                sign out
        </button>
    )
}

export const NotLoggedIn = () => {
    return(
        <main className="min-h-[70vh]">
            You must login to view this content
        </main>
    )
}

export const LoginButtons = ({setLoading}:{setLoading:(value:boolean)=>void}) => {



    const providers = ["github","google"];

    const LoginButton = ({provider}:{provider:string}) => (
        <button 
            onClick={()=>{
                setLoading(true);
                signIn(provider);
            }}
            className="
            w-44 h-10 
            capitalize">
                {provider}
        </button>
    )

    return (
        <aside 
            className="
            gap-y-2
            flex flex-col">
            {providers
            .map(provider=>(
                <CoolButton key={provider}>
                    <LoginButton provider={provider}/>
                </CoolButton>
            ))}
        </aside>
    )

}