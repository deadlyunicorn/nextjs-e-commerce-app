import { fetchItemsADMIN } from "@/app/(Admin)/api/items";

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
    if (!items || items.length<1){
        redirect('/admin')
    }

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
            text-center
            overflow-x-hidden

            ">

            <div className="xs:w-3/4 w-full
            min-h-[60vh]
            flex flex-col items-center 
            justify-start">

            
                <h1
                    className="text-2xl my-2">Items</h1>


                <ul
                    className="w-full">

                    <li 
                        className="
                            py-4
                            grid-cols-4
                            grid 
                            border-slate-200
                            dark:border-slate-800
                            border
                            w-full
                            justify-items-center
                            font-semibold"
                    key="Table titles">
                        <div>Image</div> 
                        <div>Name</div> 
                        <div>Price</div> 
                        <div className="">Stock</div> 
                    </li>
                    {
                    items.map(item=>(
                        <li 
                            className="
                                group h-[80px]
                                xs:h-[50px]
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
                                <div>{item.price.formatted_with_symbol}</div>
                                <div className="justify-self-center">{item.inventory.managed? item.inventory.available:"Not managed"}</div>

                            </div>
                            
                            <Link 
                            
                            href={`/admin/items/edit/${item.id}`}
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
                            justify-items-center">

                        {page>1
                        ?
                        <Link href={`/admin/items/${page-1}/${sortBy}/${sortingOrder||""}`}
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

                    <div className="flex flex-col gap-y-4">
                        <SortBy currentSort={sortBy}/>
                        {sortingOrder
                        ?<Link className="hover:underline" href={'./'}>Reverse Order</Link>
                        :<Link className="hover:underline" href={`${sortBy}/desc`}>Reverse Order</Link>
                    }

                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div aria-label="page number">Page Number: {page}</div>
                        <Link 
                            href="/admin/items/create/new"
                            className="
                                hover:underline
                                text-green-400
                                dark:text-green-600
                                capitalize font-bold">
                                Create New item
                        </Link>
                    </div>

                </div>

            </div>

        </main>

    )
}

export default ItemsList;