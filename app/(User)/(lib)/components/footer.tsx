import Link from "next/link";
import Image from "next/image";
import DarkMode from "../../../(Shared)/DarkMode";
import { ReactNode } from "react";
import Categories from "./categories";
import { LinkNewTab } from "@/app/(User)/about/page";

export default function Footer({children}:{children:ReactNode}) {
    return (
        <footer
            className='
                gap-y-2 py-2
                min-h-[200px] mt-20 
                w-full
                flex justify-center
               
                bg-gradient-to-b

                dark:from-[#020617cc]
                dark:via-[#0f172acc]
                dark:to-[#020617cc]
                
                from-[#e2e8f0cc]
                via-[#f1f5f9cc]
                to-[#e2e8f0cc]
                '>



            <div
                className="
                w-full flex flex-col 
                gap-y-2
                items-center justify-start
                max-w-[100%]
                xl:max-w-4xl 
                md:max-w-3xl">


                <section
                    className="w-full text-center mt-1 mb-2"
                    id='categories'>

                    {children}
                </section>

                <DarkMode/>

                <div 
                    className="
                        grid grid-cols-2 
                        w-full justify-items-center 
                        gap-y-2">



                    <LinkStyled href={'/about'}>
                        About
                    </LinkStyled>
                    <LinkStyled href={'/admin'}>
                        Admin Panel
                    </LinkStyled>
                    <Link
                        className="
                            dark:hover:text-slate-50 
                            dark:hover:underline
                            hover:text-slate-600
                            hover:underline"
                        target="_blank"
                        href="https://deadlyunicorn.notion.site/How-does-the-Cool-Webstore-by-deadlyunicorn-work-ab9bb2d8203c4e1a9210528311749326?pvs=4">

                        How it works
                    </Link>

                    <LinkStyled href="/contact">
                        Contact Dev
                    </LinkStyled>
                    {/* <LinkStyled href={'/about'}>
                        Contact
                    </LinkStyled> */}
                    
                  
                </div>

                <LinkNewTab href="https://github.com/deadlyunicorn/">

                    <span className="
                        hover:bg-purple-700 
                        hover:bg-opacity-5
                        rounded-sm px-2 py-1">
                        deadlyunicorn
                        <sub>2023</sub>

                    </span>

                </LinkNewTab>

            </div>


        </footer>

    )
}

const LinkStyled = ({ children, href }: { children: ReactNode, href: string }) => (
    <Link
        className="
            dark:hover:text-slate-50 
            dark:hover:underline
            hover:text-slate-600
            hover:underline"
        href={href}>

        {children}
    </Link>
)


