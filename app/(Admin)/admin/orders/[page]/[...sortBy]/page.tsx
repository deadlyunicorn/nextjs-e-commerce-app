
import Link from "next/link";
import Image from "next/image"
import SortBy from "./SortBy";
import { redirect } from "next/navigation"
import { getOrders } from "../../api/fetchOrders";
import { Order } from "@chec/commerce.js/types/order";

const OrderList = async ({ params }: { params: { page: string, sortBy: string[] } }) => {

    const limit = 4;

    const page = +params.page;

    if (!(page > 0)) {
        redirect('/admin/orders/1/created_at/desc')
    }

    const sortingOrder = params.sortBy[1];


    if (sortingOrder != undefined && sortingOrder != "desc") {
        redirect('./')
    }



    const sortOptions = ["created_at", "updated_at", "id", "sort_order", "name", "price"]
    const sortBy = sortOptions.includes(String(params.sortBy[0]))
        ? params.sortBy[0]
        : redirect("/admin/orders/1/created_at/desc") //default value



    const orders = await getOrders({
        limit: String(limit),
        sortBy: sortBy,
        page: String(page),
        sortDirection: sortingOrder //or desc
    });


    const nextPage = await getOrders({
        limit: String(limit),
        sortBy: sortBy,
        page: String(page + 1),
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


                {(orders && orders.length > 0)
                    ? <>
                        <ul
                            className="w-full">

                            {
                                ListOrders(orders)
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

                                {page > 1
                                    ?
                                    <Link href={`/admin/orders/${page - 1}/${sortBy}/${sortingOrder || ""}`}
                                        className="hover:underline">
                                        Previous Page
                                    </Link>
                                    : <div></div>
                                }
                                {nextPage ?
                                    <Link href={`/admin/orders/${page + 1}/${sortBy}/${sortingOrder || ""}`}
                                        className="hover:underline">
                                        Next Page
                                    </Link>
                                    : <div></div>
                                }

                            </li>
                        </ul>

                        <div className="flex justify-between w-full">

                            <div className="flex flex-col gap-y-4">
                                <SortBy currentSort={sortBy} />
                                {sortingOrder
                                    ? <Link className="hover:underline" href={'./'}>Reverse Order</Link>
                                    : <Link className="hover:underline" href={`${sortBy}/desc`}>Reverse Order</Link>
                                }

                            </div>

                            <div className="flex flex-col gap-y-4">
                                <div aria-label="page number">Page Number: {page}</div>

                            </div>

                        </div>
                    </>
                    : "No orders found."}


            </div>

        </main>

    )
}

export const getDate = (UNIX_seconds: number) => {
    const currentDate = new Date(UNIX_seconds * 1000);
    return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
}
export default OrderList;


export const ListOrders = (orders: Order[]) => {
    return <>

        <li
            className="
                py-4
                grid-cols-2
                md:grid-cols-4
                grid 
                border-slate-200
                dark:border-slate-800
                border
                w-full
                justify-items-center
                font-semibold"
            key="Table titles">
            <div className="hidden md:inline">Date</div>
            <div>Customer</div>
            <div>Total</div>
            <div className="hidden md:inline">Status</div>
        </li>
        {orders.map(order => (

            <li
                className="
                group h-[80px]
                xs:h-[50px]
                relative
                "
                key={order.id}>
                <div className="
                grid-cols-2
                md:grid-cols-4 justify-items-center place-items-center
                border border-slate-200 dark:border-slate-800
                grid  w-full h-full overflow-hidden
                ">


                    <div className="hidden md:inline">{getDate(order.created)}</div>
                    <div>
                        {`${order.customer.firstname || "Anonymous"}  ${order.customer.lastname || ""}`}
                        <hr />
                        #{order.customer_reference.slice(order.customer_reference.indexOf('-') + 1)}
                    </div>
                    <div>{order.order_value.formatted_with_symbol}</div>
                    <div className="hidden md:inline">{order.status_fulfillment} and {order.status_payment}</div>

                    {/* <div>{order.customer_reference}</div> */}

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
        ))}
    </>
}