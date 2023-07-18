'use client'

import { CoolButton } from "@/app/(Shared)/components/Global"
import { updateItem } from "@/app/(User)/(lib)/api/items";
import { Cart_Failure, Cart_Success } from "@/app/(User)/(lib)/components/cart/add_Cart";
import { Category } from "@chec/commerce.js/types/category";
import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ChangeItem = ({item,categories}:{item:Product,categories:Category[]}) => {

    const router=useRouter();
    const itemCategoryNames = item.categories.map(category=>category.name);
    const categoryIDs= categories.map(category=>category.slug);


    const [itemState,setItem]=useState(item)
    
    const [loading,setLoading]=useState(false);

    const [success,setSuccess]=useState(false);
    const [failure,setFailure]=useState(false);
    const [error,setError]=useState('Error')

    useEffect(()=>{
        setItem(item)
    },[item])

    useEffect(()=>{

        if(loading){
            setSuccess(true);
            setLoading(false);

            setTimeout(()=>{
                setSuccess(false);
            },7000)

        }
       

    },[item])
    
    useEffect(()=>{

        if (loading){
            setLoading(false);

            setTimeout(()=>{
                setFailure(false);
            },5000)
        }
       


    },[failure])

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>,keyName:string) =>{

        
        if( (keyName == "sku" || keyName=="permalink") && event.target.value.includes(" ")){
            return
        }

        // if (keyName == "price.raw"){

        //     const manUpdate = {
        //         price:{raw:event.target.value}}

        //     setItem( itemState =>
        //         ({
        //         ...itemState,
        //         ...manUpdate
        //         })
        //     )

        // }
        // else if(keyName == "inventory.available"){
        //     const manUpdate = {
        //         ...itemState.inventory,
        //         ...{avaible:event.target.value}}

        //     setItem( itemState =>
        //         ({
        //         ...itemState,
        //         ...manUpdate
        //         })
        //     )

        // }
        else{
            
            const update = {[keyName]:event.target.value}

            setItem( itemState =>
                ({
                ...itemState,
                ...update
                })
            )

        }


        
    }

    return (
        <div className="
                    text-lg 
                    grid gap-y-2">

                        {JSON.stringify(categoryIDs)}

                        {success&&
                        <Cart_Success quantity={10} item_name={item.name}/>}

                        {failure&&
                        <Cart_Failure error={error}/>} 


                    <div className="flex items-center justify-between">

                        <Image 
                            className="rounded-md aspect-square"
                            alt={item.name}
                            height={50}
                            width={50}
                            src={item.image?.url || "/image.png"}/>

                        <div>
                            &ensp;<input type="file"/>
                        </div>
                    
                    </div>
                    
                    <div>
                        Item Name:&ensp;
                        <CoolInput
                            handleChange={handleChange}
                            name="name"
                            value={itemState.name}/>
                    </div>
                    <div>
                        Permalink:&ensp;
                        <CoolInput
                            handleChange={handleChange}
                            name="permalink"
                            value={itemState.permalink}/>
                    </div>
                    <div>
                        Active:&ensp;
                        <input
                            type="checkbox"
                            checked={itemState.active}
                            name="name"
                            className="text-inherit bg-inherit hover:bg-slate-50 dark:hover:bg-slate-950" />
                    </div>

                    <div>
                        Item SKU:&ensp;
                        <CoolInput
                            handleChange={handleChange}
                            name="sku"
                            value={itemState.sku+""}/>

                    </div>
                    <div>
                        Description:&ensp;
                        <CoolInput
                            handleChange={handleChange}
                            name="description"
                            value={itemState.description||"No Description"}/>

                    </div>
                    <div>
                        Price:&ensp;
                        <input 
                            min={1}
                            className="
                            max-w-[80px]
                            text-inherit px-1 rounded-md
                            hover:bg-slate-50 bg-slate-200 
                            dark:hover:bg-slate-950 dark:bg-slate-900"
                            value={itemState.price.raw}
                            name="price.raw"
                            type="number"/> Euro
                    </div>
                    <div className="flex">
                        Stock:&ensp;
                        <input
                            name="inventory.managed"
                            onChange={(event)=>{handleChange(event,"inventory.managed")}} 
                            type="checkbox" checked={itemState.inventory.managed}/>
                        {itemState.inventory.managed? 
                            <div> 
                                Managed: 
                                <CoolNumberInput
                                    handleChange={handleChange}
                                    name="inventory.available" 
                                    min={0}
                                    value={itemState.inventory.available}
                                    /> Left
                            
                            </div> :"Not Managed"}

                    </div>
                    <div className="flex">

                        Categories:&ensp;
                        <ul>
                        {categories.map(
                            category=>(
                                <li key={category.slug}>
                                    <input type="checkbox" checked={itemCategoryNames.includes(category.name)}/>{category.name}
                                </li>
                            )
                        )}
                        </ul>

                        {/* {item.categories.map((category,index)=><span key={index}>{index>0&&","}{category.name}</span>)} */}

                    </div>

                    <div 
                    className="justify-self-center">
                        <CoolButton>
                            <button 
                            onClick={async()=>{
    
                                try{

                                    setLoading(true);
                                    await updateItem(item.id,itemState);
        
                                }
                                catch(error){
        
                                    setError(JSON.stringify(error));
                                    setFailure(true);
                                    
                                }
                                finally{
                                    router.refresh();
                                }

                            }}
                            className="
                            w-44 h-10 
                            capitalize">
                                {loading?"Loading":"Make Changes"}
                            </button>
                        </CoolButton>
                    </div>


                </div>
    )

}

const CoolInput = ({name,value,handleChange}:{name:string,value:string,handleChange:(event: React.ChangeEvent<HTMLInputElement>, name: string) => void}) => (
    <input
    onChange={(event)=>{
        handleChange(event,name);
    }}
    name={name}
    className="text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-200 
    dark:hover:bg-slate-950 dark:bg-slate-900" 
    value={value}
    
    />
)

const CoolNumberInput = ({name,value,handleChange,min}:{name:string,value:number,min:number,handleChange:(event: React.ChangeEvent<HTMLInputElement>, name: string) => void}) => (
    <input
    onChange={(event)=>{
        handleChange(event,name);
    }}
    name={name}
    className="
    max-w-[55px]
    text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-200 
    dark:hover:bg-slate-950 dark:bg-slate-900"
    min={min}
    value={value}
    type="number"
    
    />
)
