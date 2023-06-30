import Link from "next/link";
import { CategoryCollection } from "@chec/commerce.js/features/categories";

import { fetchItems } from "../../api/items";
import { fetchCategories as fetchCategories } from "../../api/categories";

const Categories = async() => {



    const items = await fetchItems({});

    const categories:CategoryCollection["data"] = await fetchCategories();
      
    
    return(
        <aside className="
        rounded-md
        bg-slate-100 
        mt-20">
            <h3 className="
                py-2">
                    Categories
            </h3>
            <div>
                <ul className="grid-cols-2 grid">
                    {categories.map(category=>(
                        <li key={category.id}>
                            <Link href={`/category/${category.slug}/1`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Categories;