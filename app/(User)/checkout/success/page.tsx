'use client'
import { useEffect } from "react";
import { deleteCookie } from "../../(lib)/api/cookies";
import LoadingScreen from "../../loader/page"
import { redirect, useRouter } from "next/navigation";

const OrderSuccess = () => {

    useEffect(()=>{
        (async()=>{
            await deleteCookie('cart_id');
        })()
    },[])


    return (
        <LoadingScreen/>
    )
}

export default OrderSuccess;