import { Product } from "@chec/commerce.js/types/product"
import Link from "next/link"
import Image from "next/image"
import { AddToCart } from "@/app/(lib)/components/cart/add_Cart"
import "@/app/(lib)/styles/mock.scss"
import PriceTag from "../product/priceTag"
import { getCart } from "../../api/cart"


const Item_StoreFront = async({item} : {item:Product}) => {

    const cart = await getCart();
    let cartItem=undefined;
    
    if ( cart && cart.line_items.length > 0 ){

        cartItem=cart.line_items.filter((
            line_item=>(line_item.product_id==item.id)
        ))[0]
        
    }


    return(
        
        <div className="
            rounded-md
            bg-slate-200
            dark:bg-white dark:bg-opacity-10 
            sm:w-[200px]  max-w-[40vw]">

                <Link
                    className="group"
                    href={`/product/${item.permalink}`}>

                    <Image src={item.image?item.image["url"]:"/image.png"} 
                    placeholder="blur"
                    blurDataURL="/image.png"
                    alt={item.name}  height={200} width={200}
                    className="rounded-md aspect-square group-hover:brightness-110"/>
                    
                    <p className="
                        my-4 h-[80px] 
                        text-xl  
                        text-black
                        group-hover:text-slate-800 

                        dark:text-slate-300
                        dark:group-hover:text-slate-50
                        font-light break-words">
                        {item.name} 
                    </p>
                </Link>

                <div className="price-tag-multiple">

                <PriceTag>
                        {item.price["formatted_with_symbol"]}&emsp;
                </PriceTag>
                </div>

                {
                    <AddToCart cartItem={cartItem} item={item} price={item.price.raw}/>}

                  
        </div>
    )
}

export default Item_StoreFront;

export const Store_Front_Fallback = () => {
    
    const arr6 = [...new Array(6)];

    const Template = ()=>(
        <div className="relative w-[200px]" >

            <div  className="mock_product">

                <div>
                    
                    <div/>

                    <div
                        className="
                        rounded-md h-[200px] bg-white bg-opacity-70 
                        
                        backdrop-blur-sm blur-sm"/>
                    
                </div>

                <div>
                    <div/>

                    <p className="
                        cursor-default my-4 
                        text-xl 
                        font-light 
                        backdrop-blur-sm blur-sm ">
                        A very cool product
                    </p>
             
                </div>
            
                <div>
                    <div/>

                    <div 
                        className="
                            cursor-default 
                            bg-gradient-to-r from-red-400 to-yellow-300
                            hover:from-red-300 hover:to-yellow-200
                             bg-clip-text text-transparent 
                             backdrop-blur-sm blur-sm">
                            For a great price
                            <span className="text-xs"> (χωρίς&nbsp;ΦΠΑ)</span>
                            
                    </div>
                </div>
                
                
            </div>
        </div>
    )
    return (
        arr6.map((item,index)=>(
            <Template key={index} />
        ))
    )
    
}