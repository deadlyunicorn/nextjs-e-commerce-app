import Link from "next/link";
import CartComponent from "./cart/Cart";
import { CartButtonWrapper } from "./cart/CartWrap";
import { ClientItemSearch } from "./searchBar";

export default function Header() {

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
                h-[max(15vh,70px)] w-full
                px-1
                sm:px-10 py-1 sm:py-2">




            {/* <CartElement/> */}

            <div className="
                max-w-[100%]
                xl:max-w-4xl 
                md:max-w-3xl
                w-full h-full
                justify-items-center place-items-end
                grid grid-cols-2
                pb-1">



                <div 
                    className="
                        max-w-[100%] flex 
                        xs:w-60 pb-1">
                    <ClientItemSearch/>
                    
                </div>

                <Link href={'/'} className="
                    text-center
                    place-self-center justify-self-center
                    text-2xl col-span-2
                    absolute top-4
                    sm:text-3xl
                    lg:text-4xl
                    bg-gradient-to-b 
                    dark:from-blue-300 dark:to-green-50
                    from-blue-600 to-blue-400
                    bg-clip-text text-transparent
                    drop-shadow-[1px_1px_2px_rgba(100,200,100,1)]">
                    The Cool Webstore
                </Link>


                <div className=" w-full flex justify-end">

                <CartButtonWrapper>
                    <CartComponent/>
                </CartButtonWrapper>
                </div>

            </div>
       

        </header>
    )
}