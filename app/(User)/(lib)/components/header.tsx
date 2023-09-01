import Link from "next/link";
import Image from "next/image";
import CartComponent from "./cart/Cart";
import { CartButtonWrapper } from "./cart/CartWrap";
import { ClientItemSearch } from "./searchBar";
import { CoolLink } from "@/app/(Shared)/components/Global";
import { getServerSession } from "next-auth";


import {Cinzel, Lato, Noto_Sans_Linear_B, Permanent_Marker} from 'next/font/google'

const customFont = Cinzel({
  subsets: ["latin"],
  weight: "400"
})


export default async function Header() {

    const session = await getServerSession();
    const userImage = session?.user?.image;

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
                z-50
                h-[min(20vh,70px)] w-full
                px-1
                sm:px-10 py-2">




            {/* <CartElement/> */}

            <div className="
                w-full h-full
                justify-items-center place-items-end
                grid grid-cols-4">



                <div
                    className="
                        h-full w-full
                        justify-start
                        items-center
                        flex 
                        px-2">
                    <ClientItemSearch />

                </div>

                <Link href={'/explore'} className={`
                    ${customFont.className}
                    text-center  w-full h-full
                    flex items-center justify-center
                    text-lg col-span-2
                    xs:text-2xl
                    sm:text-3xl
                    lg:text-4xl
                    
                    bg-gradient-to-b 
                    dark:from-blue-300 dark:to-green-50
                    from-blue-600 to-blue-400
                    bg-clip-text text-transparent
                    drop-shadow-[1px_1px_2px_rgba(100,200,100,1)]`}>
                    The Cool Webstore
                </Link>


                <div
                    className="
                        w-full h-full 
                        flex justify-center px-2 
                        gap-x-2
                        items-center">
                    <CartButtonWrapper>

                        <CartComponent />

                    </CartButtonWrapper>
                    <div className="
                        fixed top-[15vh] 
                        left-5
                        bg-slate-200 
                        dark:bg-slate-950
                        h-fit 
                        p-1 rounded-md
                        xs:left-0
                        xs:p-0 xs:top-0
                        xs:dark:bg-transparent
                        xs:h-full xs:flex xs:items-center
                        xs:bg-transparent xs:relative">
                        
                        
                        <Link
                            href={session ? "/myProfile" : "/signin"}>

                            {userImage
                                ? <Image
                                    alt="user icon"
                                    src={userImage} width={24} height={24}
                                    className="
                                hover:brightness-110
                                w-6 h-6 rounded-full"/>
                                : <svg
                                    className=" w-6 h-6 
                            stroke-slate-900 hover:stroke-slate-600
                            dark:stroke-slate-300 dark:hover:stroke-slate-50"
                                    width="40.555447mm" height="52mm" viewBox="0 0 40.555447 52"><g transform="translate(-4.7222748,1)"><circle fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={'none'} strokeOpacity={1} id="path1" cx="25" cy="11.315115" r="11.315115" /><path strokeWidth={3} fill="none" strokeLinecap="round" d="M 5.7222747,50 C 5.75066,22.365673 25,22.63023 25,22.63023 c 0,0 19.24673,-0.248585 19.277725,27.36977" id="path2" /><path strokeWidth={3} fill="none" d="M 5.7222747,50 H 44.277725" id="path3" /></g>
                                </svg>

                            }
                        </Link>
                    </div>
                </div>

            </div>


        </header>
    )
}