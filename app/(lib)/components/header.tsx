import Link from "next/link";
import CartElement from "./Cart";

export default function Header(){

    return (

        <header>

            <span className="
                text-4xl
                bg-gradient-to-b 
                from-blue-300 to-green-50
                bg-clip-text text-transparent
                drop-shadow-[1px_1px_2px_rgba(100,200,100,1)]
            ">
                HELLO WORLD AND WELCOME TO MY WEBSTORE
            </span>

            <CartElement/>
            <Link href={'/'}>Homepage</Link>

            <div className="
                h-[100px] 
                items-center justify-center 
                flex text-white
            ">
                Empty box
            </div>

        </header>
    )
}