import { getServerSession } from "next-auth"
import Link from "next/link"
import { ReactNode } from "react"

const AdminPage= async()=>{




    return(

        <LoggedIn/>

    )
}

const CoolLink = ({href,children}:{href:string,children:ReactNode}) => (

    <>
        <Link 
            className="px-2 py-1 bg-white rounded-md text-black"
            href={href}>

            {children}
            
        </Link>
    </>
)


export const LoginButtons = () => {

    return (
        <aside>
            <CoolLink 
                href="/api/auth/signin">
                Sign in
            </CoolLink>
            <CoolLink 
                href="/api/auth/signin/github">
                Sign in with Github
            </CoolLink>
            
        </aside>
    )

}

export const NotLoggedIn = () => {
    return(
        <main>
            You must login to view this content
        </main>
    )
}

const LoggedIn = () => {

    return (
        <main>
            Welcome back!
        </main>
    )
    
}


export default AdminPage;