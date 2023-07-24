"use server"
import { cookies } from "next/headers";


    export const setCartCookie = async(cart_id: string)=>{

        'use server'
        cookies().set(
        { 
            name:'cart_id',
            value: cart_id,
            maxAge: 60 * 60 * 24 * 30,
            path: "/" 
        });
    
    }

    export const getCookies= ()=>{
        //Not async but requires await?!?! idk
        //Don't mark it as async however...
        return cookies().getAll();
    }

    export const getCartCookie= () => {
        return cookies().get('cart_id')?.value;
    }

    export const deleteCookie= async (cookie_name: string) => {
        'use server'
        cookies().set({
            name: cookie_name,
            value: "",
            maxAge: 0,
            path: "/"
        })
    }

    export const setCookie = async(cookieName: string,value:string)=>{

        'use server'
        cookies().set(
        { 
            name:cookieName,
            value: value,
            maxAge: 60 * 30,
            path: "/" 
        });
    
    }
