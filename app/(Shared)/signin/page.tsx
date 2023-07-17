'use client'

import Link from "next/link"
import { ReactNode, useState } from "react"
import {signIn, signOut} from 'next-auth/react'
import { CoolButton } from "@/app/(Shared)/components/Global"

const SignInPage = ()=>{

    const [loading,setLoading]=useState(false);

    return(

        <main
            className="
                pt-[30%]
                justify-start gap-y-8
                flex flex-col
                min-h-[90vh]">

            <div className="text-xl text-center">
                {loading?"Loading..":"Log in with"}
            </div>

            {!loading&&<LoginButtons setLoading={setLoading}/>}


        </main>

    )
}

const LoginButtons = ({setLoading}:{setLoading:(value:boolean)=>void}) => {



    const providers = ["github","google"];

    const LoginButton = ({provider}:{provider:string}) => (
        <button 
            onClick={()=>{
                setLoading(true);
                signIn(provider);
            }}
            className="capitalize w-full">
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



export default SignInPage;