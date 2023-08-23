'use client'
import { useEffect } from "react";
import { deleteCookie } from "../../(lib)/api/cookies";
import LoadingScreen from "../../loader/page"
import { redirect, useRouter } from "next/navigation";
import { CoolButton, CoolLink } from "@/app/(Shared)/components/Global";
import Link from "next/link";

const OrderSuccess = () => {

    useEffect(()=>{
        (async()=>{
            await deleteCookie('cart_id');
        })()
    },[])


    return (
        <>
            <h1 className="text-2xl underline capitalize">
                Order was successful
            </h1>
            <p>
                You can check it at the <CoolLink href={"/admin/orders"}>dashboard</CoolLink>.
            </p>
            <LoadingScreen/>


            <div className="flex w-full justify-center">
                <CoolButton>
                    <Link 
                        className="px-2 py-1 capitalize"
                        href="/explore">
                        Browse the store
                    </Link>
                </CoolButton>
            </div>
        </>
        
    )
}

export default OrderSuccess;