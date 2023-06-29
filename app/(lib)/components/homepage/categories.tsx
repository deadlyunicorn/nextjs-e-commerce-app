import { commerce } from "@/app/(lib)/commerce";
import Link from "next/link";

const Categories = async() => {
    const categories = await commerce.categories.list()
    .then(category=> category.data)
      
    // console.log(categories);
    
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