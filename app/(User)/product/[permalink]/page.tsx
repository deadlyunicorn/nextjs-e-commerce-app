import { fetchItems } from "@/app/(User)/(lib)/api/items";
import ProductPage from "@/app/(User)/product/[permalink]/product-page";

export async function generateMetadata({params:{permalink}}:{params:{permalink:string}}){
    const product = [...await fetchItems({
        "query":`${permalink}`  
    })][0]

    return{
        title: product.name,
        description: product.description,
    }

}




const ItemPage = async({params:{permalink}}:{params:{permalink:string}}) =>{

    const limit = 20;

    const listing = [...await fetchItems({
        "query":`${permalink}`  
    })][0];
    

    if (listing){

        const categories = listing.categories
        .map( object=> object.slug );

        const similar = categories.length>0
            ?await fetchItems({
                "category_slug":`${categories}`,
                "limit":`${limit}`,
            }).then(
                async(res)=>res.length>1?res:await fetchItems({ //if the item, is the only one found on the same category, fetch all items
                "limit":`${limit}`,
                "sortBy":"updated_at"
            }))
            :await fetchItems({
                "limit":`${limit}`,
                "sortBy":"updated_at"
            })



        return (
            <ProductPage similar={similar} listing={listing}/>
        )

    }
    else{
        return  (<main>Item not found component</main>)

    }
    

}

export default ItemPage;