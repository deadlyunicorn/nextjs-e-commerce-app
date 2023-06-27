import Image from "next/image";
import {commerce} from "@/lib/commerce"
import Link from "next/link";
import { Button } from "./button";

export default async function Home() {
  
  
  const items = await commerce.products.list().then(result=> result.data); 
  console.log(items.map(item=>item)); 


  return (
    <main className=" flex flex-col items-center mt-5 ">
      <div className=" max-w-lg text-center ">

        <span className="
          text-4xl
          bg-gradient-to-b from-blue-300 to-green-50 bg-clip-text text-transparent
           drop-shadow-[1px_1px_2px_rgba(100,200,100,1)]
          ">
          HELLO WORLD AND WELCOME TO MY WEBSTORE
        </span>

        <div className="h-[100px] items-center justify-center flex text-white">Empty box</div>

        <div className="flex gap-20 flex-wrap">
          {items.map(
            (item)=>(
              
              <div key={item.id} className="max-w-[200px] ">

                <Image src={item.image?item.image["url"]:""} 
                alt={'aa'/*a*/}  height={200} width={200}
                className="rounded-md h-[200px]" />
                
                  <p className="my-4 h-[50px]  text-xl text-white font-light">
                    {item.name} 
                  </p>
                <div className=" bg-gradient-to-r from-red-400 to-yellow-300 bg-clip-text text-transparent ">
                      {item.price["formatted_with_symbol"]} 
                      <span className="text-xs">&nbsp;(χωρίς ΦΠΑ)</span>
                  </div>
                <Button link={item.checkout_url.checkout}/>
                  
              </div>
            )
          )}
        </div>

      </div>
    </main>

  )
} 
