import { fetchItems, fetchItemsADMIN } from "@/app/(User)/(lib)/api/items";

import Link from "next/link";
import Image from "next/image"
import SortBy from "./SortBy";
import { redirect } from "next/navigation"

const ItemsList = async({params}:{params:{page:string,sortBy:string[]}}) => {

    const limit=4;

    const page = +params.page;

    if(!(page>0)){
        redirect('/admin')
    }

    const sortingOrder = params.sortBy[1];

    if(sortingOrder!=undefined && sortingOrder!="desc" ){
        redirect('./')
    }



    const sortOptions = ["created_at","updated_at","id","sort_order", "name", "price"]
    const sortBy = sortOptions.includes(String(params.sortBy[0]))
    ?params.sortBy[0]
    :"created_at" //default value



    const items= await fetchItemsADMIN({
        limit:String(limit),
        sortBy: sortBy,
        page: String(page),
        sortDirection: sortingOrder //or desc
    });
    const nextPage= await fetchItemsADMIN({
        limit:String(limit),
        sortBy: sortBy,
        page: String(page+1),
        sortDirection: sortingOrder //or desc
    });

    return (
        <main className="
            w-full
            flex flex-col items-center 
            justify-start
            ">

            <div className="w-3/4
            flex flex-col items-center 
            justify-start">

            
            <div aria-label="page number">Page Number: {page}</div>

            <ul
                className="w-full">

                <li 
                    className="
                        py-4
                        grid-cols-4
                        grid 
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
                        
                        href={`/admin/edit/${item.id}`}
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

                <li 
                    className="
                        py-4 
                        grid grid-cols-2
                        border
                        border-slate-200
                        dark:border-slate-800
                        w-full 
                        justify-items-center"
                key="Next Page">

                    {page>1
                    ?
                    <Link href={`/admin/items/${page-1}/${sortBy}/${sortingOrder}`}
                    className="hover:underline">
                        Previous Page
                    </Link>
                    :<div></div>
                    }
                    {nextPage?
                    <Link href={`/admin/items/${page+1}/${sortBy}/${sortingOrder||""}`}
                    className="hover:underline">
                        Next Page
                    </Link>
                    :<div></div>
                    }
                    
                </li>
            </ul>

            <div className="flex justify-between w-full">
                <SortBy currentSort={sortBy}/>
                {sortingOrder
                ?<Link href={'./'}>Reverse Order</Link>
                :<Link href={`${sortBy}/desc`}>Reverse Order</Link>
                }

            </div>

            </div>

        </main>

    )
}

export default ItemsList;