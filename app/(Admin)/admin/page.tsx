import { fetchItems } from "@/app/(User)/(lib)/api/items"
import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"
import { redirect } from "next/navigation"

const AdminPage= async()=>{

    redirect('/admin/items/1/default')


    return(

        <main className="w-full sm:px-4">
            <LoggedIn/>
        </main>

    )
}

const Search = () => {

}



const LoggedIn = () => {

    return (
        <div>
            Welcome back!
        </div>
    )
    
}


export default AdminPage;