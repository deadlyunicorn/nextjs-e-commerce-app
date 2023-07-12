import { fetchItems } from "@/app/(lib)/api/items";
import ProductPage from "@/app/product/[permalink]/product-page";

const ItemPage = async({params:{permalink}}:{params:{permalink:string}}) =>{

    const limit = 20;

    const items = await fetchItems({
        "limit":`${limit}`
    });

    const listing = items.filter(item=>item.permalink==permalink)[0]
    
    if (listing){

        const categories = listing.categories
        .map( object=> object.slug );

        const similar = await fetchItems({
            "category_slug":`${categories}`,
            "limit":`${limit}`,
        });



        return (
            <ProductPage similar={similar} listing={listing}/>
        )

    }
    else{
        return  (<main>Item not found component</main>)

    }
    

}

export default ItemPage;