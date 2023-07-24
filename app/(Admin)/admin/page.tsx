import { redirect } from "next/navigation"

const AdminPage= async()=>{

    redirect('/admin/items/1/default')


    return(

        <main className="w-full sm:px-4">
            Welcome back!
        </main>

    )
}

const Search = () => {

}



export default AdminPage;