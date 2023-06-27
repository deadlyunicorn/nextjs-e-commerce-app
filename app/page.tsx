import Image from "next/image";
import {items} from "@/lib/commerce"
import Link from "next/link";
import { Button } from "./button";

export default async function Home() {
  

  return (
    <main>
      <div className="  ">


        <div className="flex gap-20 flex-wrap">
          {items.map(
            (item)=>(
              
              <div key={item.id} className="max-w-[200px] ">

                <Link href={`/product/${item.id}`}>
                <Image src={item.image?item.image["url"]:""} 
                alt={'aa'}  height={200} width={200}
                className="rounded-md h-[200px]" />
                
                  <p className="my-4 h-[50px]  text-xl text-white font-light">
                    {item.name} 
                  </p>
                </Link>
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
