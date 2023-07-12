import Link from "next/link";
import CartComponent from "./cart/Cart";
import { CartButtonWrapper } from "./cart/CartWrap";
import { CartClientWrapper } from "@/app/(CartPage)/CartClient";
import CartPage from "@/app/(CartPage)/cart/CartPage";

export default function Header(){

    return (

        <header 
            className="
                flex flex-col 
                items-center
                fixed top-0 left-0
                bg-gradient-to-b
                dark:from-[#0f172acc]
                dark:to-[#020617cc]
                from-[#f1f5f9cc]
                to-[#e2e8f0cc]
                backdrop-blur-md 
                z-10 
                h-[15vh] w-[100vw]
                px-10 py-4">

            
            <Link href={'/'} className="
                text-4xl
                bg-gradient-to-b 
                dark:from-blue-300 dark:to-green-50
                from-blue-600 to-blue-400
                bg-clip-text text-transparent
                drop-shadow-[1px_1px_2px_rgba(100,200,100,1)]
            ">
                The Cool Webstore
            </Link>

            {/* <CartElement/> */}

            <div className="
                max-w-[100%]
                xl:max-w-4xl 
                md:max-w-3xl
                w-full
                flex justify-between pt-4">
                
                <div>
                    <input 
                        placeholder="Search for cool items."
                        className="
                            bg-slate-50
                            dark:bg-slate-200 text-slate-900
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