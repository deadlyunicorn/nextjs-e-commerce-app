
import Link from "next/link";
import Image from "next/image"
import SortBy from "./SortBy";
import { redirect } from "next/navigation"
import { getOrders } from "../../api/fetchOrders";

const OrderList = async({params}:{params:{page:string,sortBy:string[]}}) => {

    const limit=4;

    const page = +params.page;

    if(!(page>0)){
        redirect('/admin/orders/1/created_at/desc')
    }

    const sortingOrder = params.sortBy[1];


    if(sortingOrder!=undefined && sortingOrder!="desc" ){
        redirect('./')
    }



    const sortOptions = ["created_at","updated_at","id","sort_order", "name", "price"]
    const sortBy = sortOptions.includes(String(params.sortBy[0]))
    ?params.sortBy[0]
    :redirect("/admin/orders/1/created_at/desc") //default value



    const orders= await getOrders({
        limit:String(limit),
        sortBy: sortBy,
        page: String(page),
        sortDirection: sortingOrder //or desc
    });
    if (!orders || orders.length<1){
        redirect('/admin')
    }

    const nextPage= await getOrders({
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
                    className="text-2xl my-2">Orders</h1>


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
                        <div>Date</div> 
                        <div>Customer</div> 
                        <div>Total</div> 
                        <div className="">Status</div> 
                    </li>
                    {
                    orders.map(order=>(
                        <li 
                            className="
                                group h-[80px]
                                xs:h-[50px]
                                relative
                                "
                            key={order.id}>
                            <div className="
                                grid-cols-4 justify-items-center place-items-center
                                border border-slate-200 dark:border-slate-800
                                grid  w-full h-full overflow-hidden
                                "> 
                               
                                
                                <div>{getDate(order.created)}</div>
                                <div>{order.customer.email}</div>
                                <div>{order.order_value.formatted_with_symbol}</div>
                                <div>{order.status_fulfillment}</div>

                                {/* <div>{order.shipping.country} - {order.shipping.town_city}</div> */}


                            </div>
                            
                            <Link 
                            
                            href={`/admin/orders/view/${order.id}`}
                            className="
                                backdrop-blur-sm
                                bg-slate-200 bg-opacity-20
                                dark:bg-slate-800 dark:bg-opacity-20
                                w-full h-full
                                group-hover:justify-center group-hover:items-center
                                hidden group-hover:flex absolute bottom-0 ">
                                Press to view
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
                        <Link href={`/admin/orders/${page-1}/${sortBy}/${sortingOrder||""}`}
                        className="hover:underline">
                            Previous Page
                        </Link>
                        :<div></div>
                        }
                        {nextPage?
                        <Link href={`/admin/orders/${page+1}/${sortBy}/${sortingOrder||""}`}
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
                        
                    </div>

                </div>

            </div>

        </main>

    )
}

const getDate = (UNIX_seconds:number) => {
    const currentDate = new Date (UNIX_seconds * 1000);
    return `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`
}
export default OrderList;