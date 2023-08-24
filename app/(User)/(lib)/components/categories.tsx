import Link from "next/link";
import { CategoryCollection } from "@chec/commerce.js/features/categories";

import { fetchCategories as fetchCategories } from "../api/categories";

const Categories = async() => {


    const categories:CategoryCollection["data"] = await fetchCategories();
      
    
    return(
        <aside className="
        rounded-md
        bg-slate-200
      dark:bg-slate-600 dark:bg-opacity-10">
            <h3 className="
                py-2">
                    Categories
            </h3>
            <div>
                <ul 
                    id="categories"
                    className="grid-cols-2 grid pb-4">
                        
                    {categories.map(category=>(
                        <li 
                            className="flex justify-center"
                            key={category.id}>

                            <div className="w-fit relative group">

                                <span 
                                    className="

                                    px-2 py-1
                                    bottom-6
                                    rounded-md
                                    backdrop-blur-md
                                    dark:bg-slate-200 dark:bg-opacity-20
                                    bg-slate-900  bg-opacity-5
                                    absolute hidden 
                                    w-[40vw] max-w-[300px]
                                    group-hover:inline">

                                    {category.description}
                                    
                                </span>

                                <Link 
                                    className="hover:underline peer"
                                    href={`/category/${category.slug}/1`}>
                                        {category.name}
                                </Link>
                            </div>

                            
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Categories;