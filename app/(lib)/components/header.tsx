import Link from "next/link";
import CartComponent from "./cart/Cart";

export default function Header(){

    return (

        <header className="flex flex-col">

            <span className="
                text-4xl
                bg-gradient-to-b 
                from-blue-300 to-green-50
                bg-clip-text text-transparent
                drop-shadow-[1px_1px_2px_rgba(100,200,100,1)]
            ">
                HELLO WORLD AND WELCOME TO MY WEBSTORE
            </span>

            {/* <CartElement/> */}
            <br/>
            <Link href={'/'}>Homepage</Link>

            <div className="
                h-[100px] 
                items-center 
                flex justify-between 
                text-white
            ">
                Empty box

                <CartComponent/>

            </div>

        </header>
    )
}