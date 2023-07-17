import { fetchItems } from "@/app/(User)/(lib)/api/items";

import Link from "next/link";
import Image from "next/image"
import SortBy from "./SortBy";
import { redirect } from "next/navigation"

const ItemsList = async({params}:{params:{sortBy:string}}) => {


    if(params.sortBy[1]!=undefined && params.sortBy[1]!="desc" ){
        redirect('./')
    }

    const sortOptions = ["created_at","updated_at","id","sort_order", "name", "price"]
    const sortBy = sortOptions.includes(String(params.sortBy[0]))
    ?params.sortBy[0]
    :"created_at" //default value



    const items= await fetchItems({
        limit:'20',
        sortBy: sortBy,
        sortDirection: params.sortBy[1] //or desc
    
    });

    return (
        <main>


            <ul>

                <li 
                    className="
                        py-4
                        grid-cols-4
                        grid 
                        border
                        border-slate-200
                        dark:border-slate-800
                        w-full
                        justify-items-center
                        font-semibold"
                key="Table titles">
                    <div>Image</div> 
                    <div>Item Name</div> 
                    <div>Item Price (Euro)</div> 
                    <div className="">Stock Quantity</div> 
                </li>
                {
                items.map(item=>(
                    <li 
                        className="
                            group h-[50px]
                            relative
                            "
                        key={item.id}>
                        <div className="
                            grid-cols-4 justify-items-center place-items-center
                            border border-slate-200 dark:border-slate-800
                            grid  w-full h-full overflow-hidden
                            "> 
                            <Image 
                                className="aspect-square"
                                alt={"Product listing"}
                                width={50}
                                height={50}
                                src={item.image?.url || "/image.png"}/>
                            
                            <div>{item.name}</div>
                            <div>{item.price.raw}</div>
                            <div className="justify-self-center">{item.inventory.managed? item.inventory.available:"Not managed"}</div>

                        </div>
                        
                        <Link 
                        
                        href={`/${item.id}`}
                        className="
                            backdrop-blur-sm
                            bg-slate-200 bg-opacity-20
                            dark:bg-slate-800 dark:bg-opacity-20
                            w-full h-full
                            group-hover:justify-center group-hover:items-center
                            hidden group-hover:flex absolute bottom-0 ">
                            Press to edit
                        </Link>
                    </li>
                ))
                }
            </ul>

            <div className="flex justify-between">
                <SortBy currentSort={sortBy}/>
                {params.sortBy[1]
                ?<Link href={'./'}>Reverse Order</Link>
                :<Link href={`${sortBy}/desc`}>Reverse Order</Link>
                }

            </div>
        </main>

    )
}

export default ItemsList;