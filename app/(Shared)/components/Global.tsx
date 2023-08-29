'use client'

import { ReactNode } from "react"
import { signOut,signIn } from "next-auth/react"
import { deleteCookie, setCookie } from "@/app/(User)/(lib)/api/cookies"
import Link from "next/link"


export const CoolButton = ({children}:{children:ReactNode}) => (

    <>
        <div 
            className="
            flex items-center justify-center
            w-fit
            text-slate-700
            bg-slate-300 hover:bg-slate-100
            rounded-md">

            {children}
            
        </div>
    </>
)


export const SignOutButton = () => {


    return(
        <button 
            
            className="
            capitalize hover:underline
            group-hover:underline"
            onClick={()=>{signOut()}}>
                log out
        </button>
    )
}

const setGuestMode = async() => {
        await setCookie("guestAdmin","true");
}

const exitGuestMode = async()=>{
    await setCookie("guestAdmin","false");

}

export const ExitGuestComponent = () => (
    <form 
            action={exitGuestMode}
            className="mt-1 flex justify-center">
            
            <CoolButton>
            
              <input
                  className="cursor-pointer px-2 py-1 capitalize"
                  value={"exit guest mode"} 
                  type="submit"/>
            </CoolButton>

    </form>
)



export const NotLoggedIn = () => {
    return(
        <main className="min-h-[70vh] flex flex-col items-center">
            You must login to view this content
            <form 
                action={setGuestMode}
                className="mt-1">
                <CoolButton>
                
                <input
                    className="cursor-pointer px-2 py-1"
                    value={"Guest Mode"} 
                    type="submit"/>
                </CoolButton>
            </form>
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
export const CoolLink = ({href,children}:{href:string,children:ReactNode})=>{
    return (
    <Link 
        href={href}
        className="
        text-blue-600
        hover:text-blue-500
        hover:underline
        dark:text-blue-400
        dark:hover:text-blue-300
        ">
            {children}
    
    </Link>
    )
}