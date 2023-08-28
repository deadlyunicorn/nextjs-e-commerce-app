import { ItemUpdateData, updateItem } from "@/app/(Admin)/api/items";
import { CoolButton } from "@/app/(Shared)/components/Global"
import { Category } from "@chec/commerce.js/types/category";
import { Product } from "@chec/commerce.js/types/product";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import { ImageInput } from "../../create/[...status]/imageInputField";
import { CoolInput } from "@/app/(Shared)/components/CoolInput";

export const ChangeItemServer = async({item,categories}:{item:Product,categories:Category[]}) => {

    const itemCategoryNames = item.categories.map(category=>category.name);


    

    const session =  await getServerSession();

    return (
        <form 

            id="itemForm"
            action={session?'/admin/items/edit/loading':"/admin/unauthorized"}
            className="
                    px-2
                    flex flex-col
                    text-lg 
                    gap-y-2">



                    <input
                        name="product_id"
                        defaultValue={item.id} 
                        className="hidden"/>

                        
                    <div className="flex items-center justify-between h-36">

                        <Image 
                            className="
                            rounded-md aspect-square"
                            alt={item.name}
                            height={50}
                            width={50}
                            src={item.image?.url || "/image.png"}/>

                        <ImageInput/>
                    
                    </div>
                    
                    <div
                        className="flex flex-wrap">
                        Item Name:&ensp;
                        <CoolInput>
                            <input
                            required
                            minLength={4}
                            maxLength={20}
                            name="name"
                            defaultValue={item.name}/>
                        </CoolInput>
                    </div>
                    <div
                        className="flex flex-wrap">
                        Permalink:&ensp;
                        <CoolInput>
                            <input
                            pattern="([^ \W \s ]|-)+"
                            title="Permalink shouldn't contain any whitespaces. You can use '_' or '-' e.g. 'cool_item'"
                            minLength={4}
                            name="permalink"
                            defaultValue={item.permalink}/>
                        </CoolInput>
                    </div>
                    <div
                        className="flex flex-wrap">
                        Active:&ensp;
                        <input
                            type="checkbox"
                            defaultChecked={item.active}
                            name="active"
                            className="text-inherit bg-inherit hover:bg-slate-50 dark:hover:bg-slate-950" />
                    </div>

                    <div
                        className="flex flex-wrap">
                        Item SKU:&ensp;
                        {/* better 8-12 */}
                        <CoolInput>
                            <input
                            minLength={8}
                            maxLength={12}
                            name="sku"
                            defaultValue={item.sku||""}/>
                        </CoolInput>

                    </div>
                    <div
                        className="flex flex-wrap">
                        Description:&ensp;
                        <CoolInput>
                            <input
                            minLength={10}
                            name="description"
                            defaultValue={item.description+""}/>
                        </CoolInput>

                    </div>
                    <div 
                        className="flex flex-wrap">
                        Price:&ensp;
                        <CoolInput>

                            <input
                            required
                            type="number"
                            className="w-[80px]"
                            step={0.01}
                            min={0.5}
                            defaultValue={item.price.raw}
                            name="price"/> 
                        </CoolInput>
                        Euro
                    </div>
                    <div 
                        className="flex flex-wrap">
                        Managed Stock:&ensp;
                        <input
                            className="peer"
                            name="managed"
                            type="checkbox" 
                            defaultChecked={item.inventory.managed}/>
                            
                            <div
                                className=
                                " hidden peer-checked:flex">  

                                <CoolInput>
                                <input  
                                    className="w-14"
                                    type="number"
                                    name="available" 
                                    min={0}
                                    defaultValue={item.inventory.available}
                                    /> 
                                </CoolInput>
                                Left
                            
                            </div>

                    </div>
                    <div 
                        className="flex flex-wrap">

                        Categories:&ensp;
                        <ul className="grid grid-cols-2">
                        {categories.map(
                            category=>(
                                <li key={category.slug}>
                                    <input 
                                        name={`category.${category.id}`}
                                        type="checkbox" 
                                        defaultChecked={itemCategoryNames.includes(category.name)}/>{category.name}
                                </li>
                            )
                        )}
                        </ul>

                        {/* {item.categories.map((category,index)=><span key={index}>{index>0&&","}{category.name}</span>)} */}

                    </div>

                    <div 
                        className="flex flex-col flex-wrap items-center justify-center">
                        
                        <CoolButton>
                            <input 
                            defaultValue={"Submit"}
                            type="submit" 
                            className="
                            cursor-pointer
                            w-44 h-10 
                            rounded-md
                            dark:bg-transparent
                            capitalize"/>
                                {/* {loading?"Loading":"Make Changes"} */}
                        </CoolButton>
                        <Link 
                            className="
                                bg-red-600 hover:bg-red-500
                                dark:bg-red-800 dark:hover:bg-red-600
                                rounded-md px-2 text-white
                                mt-2"
                            href={`/admin/items/delete/${item.id}/loading/`}>
                            Delete 
                        </Link>
                        
                       
                    </div>
                    


                </form>
    )

}


