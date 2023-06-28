import { Product } from "@chec/commerce.js/types/product"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/lib/components/button"
import "@/app/lib/components/mock.scss"

const Store_Front = ({item} : {item:Product}) => (
    <div className="w-[200px] ">

                <Link href={`/product/${item.permalink}`}>
                <Image src={item.image?item.image["url"]:""} 
                alt={item.name}  height={200} width={200}
                className="rounded-md h-[200px]"/>
                
                  <p className="my-4 h-[50px] text-xl text-white font-light">
                    {item.name} 
                  </p>
                </Link>

                <div className="
                     bg-gradient-to-r 
                     from-red-400 to-yellow-300
                     hover:from-red-300 hover:to-yellow-200
                     bg-clip-text text-transparent ">

                      {item.price["formatted_with_symbol"]} 
                      <span className="text-xs">&nbsp;(χωρίς ΦΠΑ)</span>

                  </div>

                <Button link={item.checkout_url.checkout}/>
                  
              </div>
)

export default Store_Front;

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
                        text-xl text-white 
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
                            <span className="text-xs">&nbsp;(χωρίς ΦΠΑ)</span>
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