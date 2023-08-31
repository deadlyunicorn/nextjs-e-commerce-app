'use client'
import { useEffect, useState } from "react";


export const FavoriteButton = (
    {email,item_id: product_id, isFavorite}
    :{
        email:string | null | undefined,
        item_id:string
        isFavorite:boolean
    }
) =>{

    const [fave,setFave] = useState(isFavorite);

    useEffect(()=>{

    },[fave])

    // @ts-ignore
    const handleClick = async (e) =>{

        if (email&&email.length>1){

            if (!fave){

                setFave(true);

                await fetch("/api/setFave",{
                    method:"PUT",
                    body:JSON.stringify({
                        email:email,
                        value:product_id
                    })
                })
                .then(
                    async(res)=>
                        await res.json()
                )
                .then(body=>{
                    if(body.res==OPERATION.SUCCESS){
                        setFave(true);
                    }
                    else{
                        setFave(false);
                    }
                })
            }
            else{

                setFave(false);

                await fetch("/api/removeFave",{
                    method:"PUT",
                    body:JSON.stringify({
                        email:email,
                        value:product_id
                    })
                })
                .then(
                    async(res)=>
                        await res.json()
                )
                .then(body=>{
                    if(body.res==OPERATION.SUCCESS){
                        setFave(false);
                    }
                    else{
                        setFave(true);
                    }
                })


            }
        }
        else{
            // @ts-ignore
            window.location="/signin"
        }


    }
   

    return (
            <button
                onClick={handleClick}>
                <svg 
                    data-fave={fave}
                    className="
                    w-10 h-10
                    fill-slate-200
                    
                    stroke-red-500 data-[fave=true]:fill-red-500
                    dark:stroke-red-600 dark:fill-slate-800 dark:data-[fave=true]:fill-red-600"
                    width="17.843971mm"height="15.900475mm"viewBox="0 0 17.843971 15.900475"version="1.1"id="svg1"><defs id="defs1" /><g id="layer1"transform="translate(-16.077969,-18.777596)"><path strokeWidth={0.73}strokeLinecap="round"strokeLinejoin="round"d="m 20.010828,19.145162 c -0.400891,0.0046 -0.875137,0.04347 -1.216761,0.281356 -1.062945,0.740169 -1.805682,1.994243 -2.134404,3.247098 -0.361837,1.379067 -0.261365,2.953279 0.291994,4.267259 0.866906,2.058513 2.781271,3.528271 4.462878,4.998372 1.048418,0.916552 3.460127,2.341103 3.460127,2.341103 0.01851,0.0069 0.03761,0.01149 0.05697,0.01377 0.02196,0.0088 0.04471,0.01653 0.06801,0.01659 0.02365,6.6e-5 0.04678,-0.0077 0.06908,-0.01659 0.01912,-0.0023 0.03798,-0.007 0.05626,-0.01377 0,0 2.41171,-1.42455 3.460128,-2.341103 1.681607,-1.470101 3.595886,-2.939896 4.462877,-4.998372 0.553417,-1.313965 0.654225,-2.888193 0.292351,-4.267259 -0.328741,-1.252801 -1.071921,-2.506458 -2.134761,-3.246696 -0.341627,-0.237933 -0.815869,-0.27719 -1.21676,-0.281758 -1.202667,-0.01371 -2.34917,0.698432 -3.231162,1.491781 C 25.907941,21.401258 25.311385,23.15009 25,23.580813 24.688621,23.15009 24.092076,21.40124 23.242346,20.636943 22.360257,19.84354 21.213495,19.131361 20.010828,19.145162 Z"id="path1"/></g></svg>
                
            </button>
    
    )
}

export const OPERATION = {
    SUCCESS : 1,
    ERROR : 0
}