import { commerce } from "@/app/(lib)/api/commerce";
import ProductPage from "@/app/(lib)/components/product/product-page";

const ItemPage = async({params:{permalink}}:{params:{permalink:string}}) =>{

    const items = await commerce.products.list()
    .then(result=> result.data);

    const listing = items.filter(item=>item.permalink==permalink)[0]
    
    if (listing){

        const categories = listing.categories
        .map( object=> object.slug );

    
        const similar = await commerce.products.list({
            category_slug: categories,
            limit:20
        })
        .then(data=>(data.data))


        return (
            <ProductPage similar={similar} listing={listing}/>
        )

    }
    else{
        return  (<main>Item not found component</main>)

    }
    

}

export default ItemPage;