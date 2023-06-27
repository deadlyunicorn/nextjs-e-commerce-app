import { items } from "@/lib/commerce";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/button";

const ItemPage = ({params:{permalink}}:{params:{permalink:string}}) =>{

    const listing = items.filter(item=>item.permalink==permalink)[0]
    console.log(listing.permalink);

    return (
        <main className="flex flex-wrap border-4 border-white justify-evenly">
            <div className=" w-[300px]">

                <Link href={`/product/${listing.permalink}`}>
                    <Image src={listing.image?listing.image["url"]:""} 
                    alt={'aa'}  height={300} width={300}
                    className="rounded-md h-[300px]" />
                    
                    
                </Link>
               <div className="flex flex-col justify-between flex-wrap">
                    <p className="my-4 min-h-[50px]  text-4xl text-white font-light">
                        {listing.name}aaaaa
                    </p>
                    <div>
                        <span className="
                            text-2xl
                            bg-gradient-to-r from-red-400 to-yellow-300 bg-clip-text text-transparent">
                            {listing.price["formatted_with_symbol"]}
                            <span className="text-xs">&nbsp;(χωρίς ΦΠΑ)</span>
                        </span>
                        <Button link={listing.checkout_url.checkout}/>
                    </div>
               </div>
            
            

            </div>


            

        </main>
    )
}

export default ItemPage;