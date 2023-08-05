import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"
import { getCheckoutToken } from "../api/checkout";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { redirect } from "next/navigation";
import { CoolInput } from "@/app/(Shared)/components/CoolInput";


const Checkout = async({params}:{params:{cart_id:string}}) => {

    const cart_id=params.cart_id;


    let res 
    
    try{
        res = await getCheckoutToken(cart_id)
    }
    catch(err){
        redirect('/');
    };

    const checkoutToken:CheckoutToken["id"] = res.id;
    const items:LineItem[] = res.line_items;

    items.length<1 && redirect("/");

    const merchant = res.merchant;
    const shippingDetails = res.shipping_methods;

    return(
    <main className="flex flex-col justify-start min-h-[70vh] ">

        <div className="px-2 text-center">


            <ul className="flex flex-col gap-2 w-full">

                <li className="grid grid-cols-4 place-items-center mb-4 text-lg">
                    <span className="col-span-2 place-self-start">Item Name</span>
                    <div className="grid grid-cols-2 w-full">
                        <span >Price</span>
                        <span className="hidden xs:inline">Quantity</span>

                    </div>
                    <span >Total</span>

                </li>
                {items.map(
                    (item:LineItem)=>
                    <li
                        className="grid grid-cols-4 place-items-center "
                        key={item.id}>

                        <div
                            className="
                            col-span-2 w-full">
                            <Link
                                target="_blank"
                                className="hover:brightness-125 flex gap-x-2 items-center w-fit pr-2"
                                href={`/product/${item.permalink}`}>

                            <Image 
                                //@ts-ignore
                                src={item.image.url}
                                blurDataURL="/image.png"
                                alt={item.name}
                                className="aspect-square bg-white"
                                height={50} width={50}/>,
                            <span >{item.name}</span>
                            </Link>



                        </div>

                        <div className="grid grid-cols-2 place-items-center w-full">
                            
                            <span >{item.price.formatted_with_symbol}</span>
                            <span>x{item.quantity}</span>
                        
                        </div>
                        <span>{item.line_total.formatted_with_symbol}</span>

                    </li>

                        
                )}

                <li className="grid grid-cols-4 text-xl">
                   <span className="capitalize col-span-3 place-self-end pr-2">subtotal</span> 
                   <span>{res.subtotal.formatted_with_symbol}</span> 
                </li>
            </ul>
            <p className="capitalize">
                Shipping price: {res.shipping.price.formatted_with_symbol}
            </p>

            <form 
                className="flex flex-col gap-y-2"
                action={"/loading/page"}>

                <input
                    className="bg-transparent w-full" 
                    readOnly value={checkoutToken} name="checkout_token_id"/>
                    <input className="bg-transparent w-full hidden" name="gateway" defaultValue={'test_gateway'}/>,

                <FormattedInput/>
           
                
            </form>

            {/* payment.card.token	string	optional	
For Stripe (Token API), the card token generated

->temp to stripe_pk*/}

            <div>
                {/* {process.env.STRIPE_PK} */}
            </div>

            
               
        </div>

            


    </main>
    )
}

export const LinkNewTab = ({children,href}:{children:ReactNode,href:string}) => (
    <Link href={href} target="_blank" tabIndex={0}>
        {children}
    </Link>
)


const FormattedInput = () =>{

    const inputArray=[
        
        ["email",<input className="bg-transparent w-full"  type="email" name="email"/>],
        ["firstName",<input className="bg-transparent w-full"  type="text" name="firstName"/>],
        ["lastName",<input className="bg-transparent w-full"  type="text" name="lastName"/>],
        ["country",<input className="bg-transparent w-full"  type="text" name="country"/>],
        ["city",<input className="bg-transparent w-full"  type="text" name="city"/>],
        ["address",<input className="bg-transparent w-full"  type="text" name="address"/>], 
        ["postcode",<input className="bg-transparent w-full"  type="number" minLength={5} maxLength={5} name="postcode"/>],
        ["cc",<input className="bg-transparent w-full"     name="cc" pattern="/^4[0-9]{12}(?:[0-9]{3})?$/ | /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/"/>],
        ["",<input className="bg-transparent w-full"  type="submit"/>],
    ]

    return (
        <>
            {inputArray.map(
                (element,index)=>
                <div    
                    className="flex" 
                    key={index}>
                    
                    <span>

                    {element[0]}
                    </span>
                    <CoolInput>
                        {element[1]}
                    </CoolInput>
                </div>

            )
            }
        </>
    )
}

export default Checkout;


