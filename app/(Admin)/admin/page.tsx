'use client'

import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import { ReactNode } from "react"

const AdminPage=()=>{


    return(
        <SessionProvider>

            <main>

                <SessionComponent/>
                {/* {Login.id + " " + Login.email} */}
                hello world
                <CoolLink 
                    href="/api/auth/signin">
                    Sign in
                </CoolLink>
                <CoolLink 
                    href="/api/auth/signin/github">
                    Sign in with Github
                </CoolLink>
                <CoolLink 
                    href="/api/auth/signout">
                    Sign out
                </CoolLink>
               

            </main>
        </SessionProvider>

    )
}

const CoolLink = ({href,children}:{href:string,children:ReactNode}) => (

    <Link 
        className="px-2 py-1 bg-white rounded-md text-black"
        href={href}>

        {children}
        
    </Link>

)

const SessionComponent = () => {

    const { data: session, status } = useSession()

    return (
        <div>
            ABC
            {session?.user?.name}
                {session?.user?.email + " "}
            

        </div>
    )
}

export default AdminPage;