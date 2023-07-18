import { CoolButton } from "@/app/(Shared)/components/Global"
import { Category } from "@chec/commerce.js/types/category";
import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";

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
                        <CoolInput
                            name="name"
                            defaultValue={item.name}/>
                    </div>
                    <div>
                        Permalink:&ensp;
                        <CoolInput
                            name="permalink"
                            defaultValue={item.permalink}/>
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
                        <CoolInput
                            name="sku"
                            defaultValue={item.sku+""}/>

                    </div>
                    <div>
                        Description:&ensp;
                        <CoolInput
                            name="description"
                            defaultValue={item.description+""}/>

                    </div>
                    <div>
                        Price:&ensp;
                        <CoolNumberInput
                            min={1}
                            defaultValue={item.price.raw}
                            name="price"/> Euro
                    </div>
                    <div className="flex">
                        Stock:&ensp;
                        <input
                            className="peer"
                            name="managed"
                            type="checkbox" 
                            defaultChecked={item.inventory.managed}/>
                            
                            <div
                                className="hidden peer-checked:inline">  

                                Managed: 
                                <CoolNumberInput
                                    
                                    name="available" 
                                    min={0}
                                    defaultValue={item.inventory.available}
                                    /> Left
                            
                            </div>
                            <div
                                className="inline peer-checked:hidden">
                                Not Managed
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
                            w-44 h-10 
                            capitalize"/>
                                {/* {loading?"Loading":"Make Changes"} */}
                        </CoolButton>
                    </div>


                </form>
    )

}

const CoolInput = ({name,defaultValue,}:{name:string,defaultValue:string}) => (
    <input
    placeholder="No data"
    name={name}
    className="text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-200 
    dark:hover:bg-slate-950 dark:bg-slate-900" 
    defaultValue={defaultValue}
    
    />
)

const CoolNumberInput = ({name,defaultValue,min}:{name:string,defaultValue:number,min:number}) => (
    <input
    name={name}
    className="
    max-w-[120px]
    text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-200 
    dark:hover:bg-slate-950 dark:bg-slate-900"
    min={min}
    defaultValue={defaultValue}
    type="number"
    
    />
)
