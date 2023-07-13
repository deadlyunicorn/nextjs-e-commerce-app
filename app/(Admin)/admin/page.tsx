import Link from "next/link"
import { ReactNode } from "react"

const AdminPage= async()=>{




    return(

        <div>
            <LoggedIn/>
        </div>

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