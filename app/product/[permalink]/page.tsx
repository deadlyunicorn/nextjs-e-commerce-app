import { fetchItems } from "@/app/(lib)/api/items";
import ProductPage from "@/app/product/[permalink]/product-page";

export async function generateMetadata({params:{permalink}}:{params:{permalink:string}}){
    const product = [...await fetchItems({
        "query":`${permalink}`  
    })][0]

    return{
        title: product.name,
        description: product.description,
    }

}

//generateMetadata() doesn't seem to work properly..



const ItemPage = async({params:{permalink}}:{params:{permalink:string}}) =>{

    const limit = 20;

    const listing = [...await fetchItems({
        "query":`${permalink}`  
    })][0];
    

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