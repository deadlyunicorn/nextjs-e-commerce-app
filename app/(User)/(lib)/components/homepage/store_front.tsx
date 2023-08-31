import { Product } from "@chec/commerce.js/types/product"
import Link from "next/link"
import Image from "next/image"
import { AddToCart, MockAddToCart } from "@/app/(User)/(lib)/components/cart/add_Cart"
import "@/app/(User)/(lib)/styles/mock.scss"
import PriceTag from "../product/priceTag"
import { getCart } from "../../api/cart"
import { FavoriteButton } from "../browsing/addToFaves"
import { getServerSession } from "next-auth"
import { getFavorites } from "../../api/favorites"


const Item_StoreFront = async({item,email,favorites} : {item:Product,email:string|undefined|null,favorites:string[]}) => {

    const cart = await getCart();
    let cartItem=undefined;



    if ( cart && cart.line_items.length > 0 ){

        cartItem=cart.line_items.filter((
            line_item=>(line_item.product_id==item.id)
        ))[0]
    }


    const isFavorite = favorites.includes(item.id);


    return(
        
        <div className="
            rounded-md
            bg-slate-200 relative
            dark:bg-white dark:bg-opacity-10 
            xs:w-[200px]  max-w-[40vw]">

                <Link
                    
                    className="group"
                    href={`/product/${item.permalink}`}>

                    <div className="relative">

                        <div className="relative">
                            <Image src={item.image?item.image["url"]:"/image.png"} 
                            placeholder="blur"
                            blurDataURL="/image.png"
                            alt={item.name}  height={200} width={200}
                            className="
                                bg-white
                                rounded-md aspect-square group-hover:brightness-110"/>

                        </div>

                        {item.inventory.managed
                            &&item.inventory.available<10
                            &&
                            <p className="
                                font-bold
                                text-red-600
                                bg-slate-200 bg-opacity-40
                                backdrop-blur-md
                                absolute bottom-2 
                                w-full">
                                
                                Only {item.inventory.available} left
                            </p>
                        }

                    </div>


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
                <div 
                    className="
                        top-[23%]
                        xs:top-[33%]
                        absolute right-0 pr-2">

                    <FavoriteButton 
                        isFavorite={isFavorite}
                        email={email} item_id={item.id}/>
                        
                </div>

                

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

        <div  className="
            
            rounded-md
            bg-slate-200 relative
            dark:bg-white dark:bg-opacity-10 
            blur-md
            xs:w-[200px]  max-w-[40vw]
            mock_product">

                <div>
                    
                    <div/>

                    <div
                        className="
                        rounded-md h-[200px] bg-white bg-opacity-30 "/>
                    
                    </div>

                <div>

                    <div/>

                    <p className="

                        my-4 h-[80px] 
                        text-xl  
                        text-black
                        group-hover:text-slate-800 

                        dark:text-slate-300
                        dark:group-hover:text-slate-50
                        font-light break-words
                        cursor-default">
                        A very cool product
                    </p>
             
                </div>

            
                <div>
                    <div/>

                    <div >
                        <PriceTag>
                          €XX.00
                        </PriceTag>
                        <MockAddToCart/>
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