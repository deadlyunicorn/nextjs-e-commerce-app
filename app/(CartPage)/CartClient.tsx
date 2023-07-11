'use client'

import { ReactNode, useEffect } from "react"
import { setCart } from "@/app/(lib)/components/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(lib)/components/redux/store";
import "@/app/(lib)/styles/animations.scss"


export const CartClientWrapper= ({children}:{children:ReactNode})=>{
    
    const cart = useSelector((state:RootState)=> state.cart.value);
    const dispatch = useDispatch();


    useEffect(()=>{

        document.addEventListener('keydown', e => {
            if (e.code=='Escape'){
                dispatch(setCart(false))
            }
        })
    },[])

    
    return (
        <>
        {cart&&

        //Above here should be the nav bar - header etc.
            <div 
                className="
                rounded-md
                flex justify-center
                animation-appear
                bg-slate-100
                dark:bg-slate-900
                backdrop-blur-lg
                bg-opacity-90
                dark:bg-opacity-90
                z-20
                left-0 bottom-0
                fixed w-[100vw] h-[80vh]">

            <div
                className="
                    w-[100vw]
                    xl:max-w-4xl 
                    md:max-w-3xl
                    text-center xs:px-5
                    pb-6
                    max-w-[100%] z-30 h-fit">

                <div className="w-full flex justify-end pr-2 py-1">

                    <button onClick={()=>{dispatch(setCart(false))}}>
                        <svg
                            className="w-4 h-4 hover:stroke-red-400 stroke-red-500"
                            viewBox="0 0 10 10">
                            <path
                            d="M 0,0 10,10"/>
                            <path
                            d="M 0,10 10,0"/>
                        </svg>
                    </button>
                </div>
            
                {children}
                


            </div>

            <div 
                    onClick={()=>{
                        dispatch(setCart(false))
                    }}
                    className="fixed h-full w-[100vw] bottom-0 left-0 z-20">

            </div>

        </div>
        }  
        </>

    )
}