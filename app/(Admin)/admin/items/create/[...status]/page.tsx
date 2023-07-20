import {   fetchItemsADMIN, updateItem } from "@/app/(Admin)/api/items";
import Link from "next/link";
import { FailureMessage, SuccessMessage } from "@/app/(Shared)/components/UserAlert";
import { CreateItemForm } from "./CreateItemForm";



const ItemsList = async({params,searchParams}:{params:{status:string},searchParams:{error:string,message:string}}) => {



    const status = params.status;

    return (
        <main className="
            w-full
            overflow-x-hidden
            flex flex-col items-center 
            justify-start relative
            ">


            {status=="success" && 
            <SuccessMessage message={searchParams.message}/>}

            {status=="fail" && 
            <FailureMessage error={searchParams.error}/>}


            <div className="
            bg-slate-300 py-4 rounded-md
            dark:bg-slate-800
            w-full
            xs:w-3/4
            flex flex-col items-center 
            justify-start">

            
                <CreateItemForm/>
                
            </div>

            <Link
                    className="hover:underline"
                    href="/admin">
                    Back to Dashboard
            </Link>

        </main>

    )
}


export default ItemsList;