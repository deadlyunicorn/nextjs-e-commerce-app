'use client'

import Link from "next/link"
import {  useState } from "react"
import {  LoginButtons } from "@/app/(Shared)/components/Global"

const SignInPage = ()=>{

    const [loading,setLoading]=useState(false);

    return(

        <main
            className="
                pt-[10%]
                justify-start gap-y-8
                flex flex-col
                min-h-[60vh]">

            <div className="text-red-500 text-2xl text-center ">
                Unauthorized.
            </div>
            <div className="text-xl text-center ">
                {loading?"Loading..":"Try again?"}
            </div>

            {!loading&&<LoginButtons setLoading={setLoading}/>}

            <div className="flex justify-center">
                <Link href={"/"} className="hover:underline w-fit">
                    Homepage
                </Link>
            </div>

        </main>

    )
}



export default SignInPage;