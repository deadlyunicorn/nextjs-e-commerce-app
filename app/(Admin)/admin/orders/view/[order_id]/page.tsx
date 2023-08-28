import { redirect } from "next/navigation";
import { getOrder } from "../../api/fetchOrders";
import { countryListNumeric } from "@/app/(User)/checkout/[...cart_id]/page";
import { ReactNode } from "react";
import Link from "next/link";

const OrderDetails = async({params}:{params:{order_id:string}}) => {



    const order = await getOrder(params.order_id)
    if (!order){
        redirect('/admin/orders')
    }


    const country = countryListNumeric.filter(entry=>
        entry.code==order.shipping.country
    )[0].name;

    const getDate = (UNIX_seconds:number) => {
        const targetDate = new Date (UNIX_seconds * 1000);
        return `${targetDate.getDate()}/${targetDate.getMonth()+1}/${targetDate.getFullYear()} - ${targetDate.getHours()<10?`0${targetDate.getHours()}`:targetDate.getHours()}:${targetDate.getMinutes()}`
    }

    const orderNumber = order.customer_reference.slice(order.customer_reference.indexOf('-')+1);

    return (
        <main className="
        w-full
        overflow-x-hidden
        flex flex-col items-center 
        justify-start relative
        ">

        <h1 className="text-2xl my-2 text-center">Viewing order #{orderNumber}</h1>

            <article
                className="
                bg-slate-200 py-4 rounded-md
                dark:bg-slate-800
                xs:max-w-[3/4]
                xs:px-20
                px-2
                grid 
                gap-y-2
                gap-x-2
                md:gap-x-4
                lg:gap-x-8
                lg:px-20
                xl:px-44
                md:grid-cols-2 
                grid-cols-1 ">


                <section 
                aria-label="customer details">
                    <ul>
                        <h2 className="text-center capitalize text-xl underline">
                            customer details
                        </h2>
                        
                        <li>Email: {order.customer.email}</li>
                        <li>Name: {order.customer.firstname}</li>
                        <li>Surname: {order.customer.lastname}</li>
                        <li>Phone: {order.customer.phone||"Not Provided"}</li>
                    </ul>

                </section>

                <section 
                    aria-label="shipping details">
                    <ul>
                        <h2 className="text-center capitalize text-xl underline">
                            shipping details
                        </h2>
                        <li>Country: {country}</li>
                        <li>City: {order.shipping.town_city}</li>
                        {/* //todo basically post code we used is for the card verification, not shipping..*/}
                        <li>Post Code: {order.transactions[0].payment_source.billing_zip_postal_code||"Not Found"}</li>
                        <li>Address: {order.shipping.street}</li>
                    </ul>
                </section>

                <section 
                aria-label="products ordered">
                    <ul className="w-full">
                        <h2 className="text-center capitalize text-xl underline">
                            order items
                        </h2>
                        {order.order.line_items.map(
                            (item,index)=>
                            <li 
                                className="relative mb-2"
                                key={item.id}>
                                <h1 className="text-center text-lg md:absolute right-0">#{index+1}</h1>
                                
                                <ul className="border-l pl-2">
                                    <li>
                                        Item:&ensp;
                                        <Link 
                                        target="_blank"
                                        href={`/admin/items/edit/${item.product_id}`}
                                        className="hover:underline text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                            
                                            {item.product_name}
                                        
                                        </Link>
                                    </li>
                                    <li>
                                      Price: {item.price.formatted_with_symbol}
                                        
                                    </li>
                                    <li>
                                      Quantity: {item.quantity}
                                    </li>
                                    <li>
                                      SUM: {item.line_total.formatted_with_symbol}
                                    </li>
                                    <li>
                                        SKU: {item.product_sku || "NO SKU"}
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>

                </section>

                <section
                    aria-label="order details">
                    <ul>
                        <h2 className="text-center capitalize text-xl underline">
                            order details
                        </h2>
                        <li className="capitalize">Status: {order.status_fulfillment} - {order.status_payment} </li>
                        <li>Order ID: {order.customer_reference}</li>
                        <li>Order date: {getDate(order.created)}</li>
                        {order.sandbox&&<li className="text-red-700 dark:text-red-400">Sandboxed order!</li>}
                        <li className="text-green-700 dark:text-green-400">Total: {order.order_value.formatted_with_symbol}</li>
                    </ul>
                </section>

                

            </article>
            <Link
                    className="hover:underline"
                    href="/admin/orders">
                    Back to Orders
            </Link>
        </main>
    )
}


export default OrderDetails;