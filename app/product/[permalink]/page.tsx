import { items } from "@/app/lib/commerce";
import ProductPage from "@/app/lib/components/product/product-page";

const ItemPage = ({params:{permalink}}:{params:{permalink:string}}) =>{

    const listing = items.filter(item=>item.permalink==permalink)[0]
    
    if (listing){

        const categories = listing.categories
        .map( object=> object.slug );

        const similar = items.filter(

            product=>(
                //getting the [slugs] of the current product
                product.categories.map( object => (
                    object.slug
                ))
                //checking if our current listing
                //contains any of the current product
                //slugs - thus making it relevant
                .filter(
                    category=>(
                        categories.includes(category)
                    )
                )
                .toString()
            )

        )


        return (
            <ProductPage similar={similar} listing={listing}/>
        )

    }
    else{
        return  (<main>Item not found component</main>)

    }
    

}

export default ItemPage;