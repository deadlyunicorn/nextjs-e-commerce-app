import { items } from "@/lib/commerce";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/button";
import { Fragment } from "react";

const ItemPage = ({params:{permalink}}:{params:{permalink:string}}) =>{

    const listing = items.filter(item=>item.permalink==permalink)[0]
    

    const categories = listing.categories
        .map( object=> object.slug );

    // console.log(categories);

    
    const similar = items.filter(

        (product)=>(
            //getting the [slugs] of the current product
            product.categories.map( object => (
                object.slug
            )) 
            //checking if our current listing
            //contains any of the current product
            //slugs - thus making it relevant
            .filter(
                (category)=>(
                    categories.includes(category)
                )
            )
        )
        
    );

    // console.log(listing);

    return listing ? (
        <main className="flex flex-wrap border-4 border-white justify-evenly">
            <div className=" w-[300px]">

                <Link href={`/product/${listing.permalink}`}>
                    <Image src={listing.image?listing.image["url"]:""} 
                    alt={'aa'}  height={300} width={300}
                    className="rounded-md h-[300px]" />
                    
                    
                </Link>
               <div className="flex flex-col justify-between flex-wrap">
                    <p className="my-4 min-h-[50px]  text-4xl text-white font-light">
                        {listing.name}
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
                    {}
               </div>

                <div dangerouslySetInnerHTML={{__html:listing.description}}/>
            

            </div>

            

        </main>
    ):
    (<div>Item not found component</div>)
}

export default ItemPage;