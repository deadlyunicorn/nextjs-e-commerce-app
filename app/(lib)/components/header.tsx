import Link from "next/link";
import CartComponent from "./cart/Cart";
import { CartButtonWrapper } from "./cart/CartWrap";
import { CartClientWrapper } from "@/app/(CartPage)/CartClient";
import CartPage from "@/app/(CartPage)/cart/CartPage";

export default function Header(){

    return (

        <header 
            className="
                flex flex-col fixed top-0 left-0
                dark:bg-slate-900 dark:bg-opacity-80
                bg-slate-100 bg-opacity-80
                backdrop-blur-md 
                z-10 
                h-[15vh] w-[100vw]
                px-10 py-4">

            
            <Link href={'/'} className="
                text-4xl
                bg-gradient-to-b 
                from-blue-300 to-green-50
                bg-clip-text text-transparent
                drop-shadow-[1px_1px_2px_rgba(100,200,100,1)]
            ">
                The Cool Webstore
            </Link>

            {/* <CartElement/> */}

            <div className="flex justify-between pt-4">
                
                <div>
                    <input 
                        placeholder="Search for cool items."
                        className="
                            bg-slate-200 text-slate-900
                            py-1
                            pl-2 
                            rounded-md
                            w-60"/>
                </div>

                <CartButtonWrapper>
                    <CartComponent/>
                </CartButtonWrapper>

            </div>
       

        </header>
    )
}