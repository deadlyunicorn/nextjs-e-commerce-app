import { CoolButton } from "@/app/(Shared)/components/Global"
import { Category } from "@chec/commerce.js/types/category";
import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import { ReactNode } from "react";

export const ChangeItemServer = ({item,categories}:{item:Product,categories:Category[]}) => {

    const itemCategoryNames = item.categories.map(category=>category.name);


    return (
        <form 

            id="itemForm"
            method="POST"
            action="/api/editForm/"
            className="
                    text-lg 
                    grid gap-y-2">



                    <input
                        name="product_id"
                        defaultValue={item.id} 
                        className="hidden"/>
                    <div className="flex items-center justify-between">

                        <Image 
                            className="rounded-md aspect-square"
                            alt={item.name}
                            height={50}
                            width={50}
                            src={item.image?.url || "/image.png"}/>

                        <div>
                            {/* &ensp;<input  */}
                                        {/* name="imgFile" */}
                                        {/* type="file"/>  */}
                        </div>
                    
                    </div>
                    
                    <div>
                        Item Name:&ensp;
                        <CoolInput>
                            <input
                            minLength={4}
                            maxLength={20}
                            name="name"
                            defaultValue={item.name}/>
                        </CoolInput>
                    </div>
                    <div>
                        Permalink:&ensp;
                        <CoolInput>
                            <input
                            pattern="[^ \W \s ]+"
                            minLength={4}
                            name="permalink"
                            defaultValue={item.permalink}/>
                        </CoolInput>
                    </div>
                    <div>
                        Active:&ensp;
                        <input
                            type="checkbox"
                            defaultChecked={item.active}
                            name="active"
                            className="text-inherit bg-inherit hover:bg-slate-50 dark:hover:bg-slate-950" />
                    </div>

                    <div>
                        Item SKU:&ensp;
                        {/* better 8-12 */}
                        <CoolInput>
                            <input
                            minLength={8}
                            maxLength={12}
                            name="sku"
                            defaultValue={item.sku+""}/>
                        </CoolInput>

                    </div>
                    <div>
                        Description:&ensp;
                        <CoolInput>
                            <input
                            minLength={10}
                            name="description"
                            defaultValue={item.description+""}/>
                        </CoolInput>

                    </div>
                    <div className="flex">
                        Price:&ensp;
                        <CoolInput>

                            <input
                            type="number"
                            className="w-[80px]"
                            step={0.01}
                            min={1}
                            defaultValue={item.price.raw}
                            name="price"/> 
                        </CoolInput>
                        Euro
                    </div>
                    <div className="flex">
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
                    <div className="flex">

                        Categories:&ensp;
                        <ul>
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
                    className="justify-self-center">
                        <CoolButton>
                            <input 
                            defaultValue={"Submit"}
                            type="submit" 
                            className="
                            cursor-pointer
                            w-44 h-10 
                            bg-slate-200 hover:bg-slate-100 rounded-md
                            dark:bg-transparent
                            capitalize"/>
                                {/* {loading?"Loading":"Make Changes"} */}
                        </CoolButton>
                    </div>


                </form>
    )

}

const CoolInput = ({children}:{children:ReactNode}) => (
    <div
    className="
    w-fit
    text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-200 
    dark:hover:bg-slate-950 dark:bg-slate-900">
        {children}
    </div>
)

