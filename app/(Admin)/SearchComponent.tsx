'use client'

import { useEffect, useState } from "react"
import { Product } from "@chec/commerce.js/types/product";
import { fetchItemsADMIN } from "./api/items";
import Image from "next/image";
import Link from "next/link";

export const ClientItemSearch = () => {


    const [change,setChange]=useState<undefined|string>(undefined);


    const [query,setQuery]=useState<string>('');
    const [typing,setTyping]=useState(false);
    const [loading,setLoading]=useState(false);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setChange(e.target.value);
        setTyping(true);
    }

    const [products,setProducts] = useState<undefined|Product[]>(undefined);

    useEffect(()=>{


        //we need to make sure the fetch happens 
        //only once. After the user stops typing.
        (async()=>{

            if (change){
                setLoading(true);
                if (typing){
                    await delay(2000);
                    setTyping(false);
                    setQuery(change);
                }
                else{
                    if (query==change){

                        await fetchItemsADMIN({
                            query:query
                        }).then(res=>{
                            setProducts(res);
                            setLoading(false);
                        })
                    }
                }
            }

        })()


        
    },[change,typing,query])

    return (
        <div className="relative">


{/* make it so that we see the listings only if the input is active. */}
            
            <input
                value={change}
                onChange={handleChange}
                placeholder="Search"
                className="
                bg-slate-50
                dark:bg-slate-200 text-slate-900
                py-1
                pl-2
                ml-2  
                rounded-md
                w-full z-[3]
                peer"/>


            {change&&
                <div className="
                    bg-slate-200
                    dark:bg-slate-950
                    z-[2]
                    rounded-md
                    top-0 left-0
                    mt-32 ml-[10vw]
                    w-[80vw] h-fit
                    py-2
                    fixed hidden
                    items-center justify-center text-center
                    peer-focus-within:inline
                    hover:inline ">
                    

                        
                        {loading
                        ?<Loading/>
                        
                        :products
                        ?<ul className="flex flex-col gap-y-2">
                            {products.length} result{products.length>1&&'s'} found.
                            {products.map(
                                product=>
                                    <li 
                                        className="
                                            mx-2
                                            bg-blue-600 bg-opacity-5
                                            dark:bg-white dark:bg-opacity-5

                                            hover:bg-opacity-10 rounded-md
                                            hover:brightness-110"
                                        key={product.id}>
                                        <Link 
                                            className="flex justify-between items-center"
                                            href={`/admin/items/edit/${product.id}`}>
                                            <Image 
                                                src={product.image?.url||'/image.png'}
                                                alt={product.name}
                                                height={50} 
                                                width={50} 
                                                className="rounded-md aspect-square w-[50px] h-[50px]"/>
                                            <div className="w-full text-center">
                                                {product.name} {product.price.formatted_with_symbol}
                                            </div>
                                        </Link>

                                    </li>
                            )}
                        </ul>
                        :<div className="h-20 flex items-center justify-center">No products found.</div>
                        }
                </div>
            }



        </div>

    )
}


const delay = async(time:number) => {
    return new Promise(res=>{
        setTimeout(res,time);
    })
}


import "@/app/(User)/(lib)/styles/animations.scss"

const Loading=()=>{
    
    const Dot = ()=>(
        <div className="
            h-2 w-2 
            bg-white 
            rounded-md 
            drop-shadow-[0px_0px_4px_rgba(100,100,200,1)]"/>
    )
    
    return(
        <div className="
          flex 
          justify-around items-center   
          gap-5 h-20 py-5 px-2 w-[90vw]
          animation-loader
          ">

            <Dot/>
            <Dot/>
            <Dot/>
        </div>
    )
}