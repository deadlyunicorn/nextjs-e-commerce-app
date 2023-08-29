import { fetchItems } from "@/app/(User)/(lib)/api/items";
import ProductPage from "@/app/(User)/product/[permalink]/product-page";
import { Product } from "@chec/commerce.js/types/product";

export async function generateMetadata({params:{permalink}}:{params:{permalink:string}}){
    const product = [...await fetchItems({
        "query":`${permalink}`,
        "active":"1"

    })][0]

    return{
        title: product.name,
        description: product.description,
    }

}




const ItemPage = async({params:{permalink}}:{params:{permalink:string}}) =>{

    const limit = 20;

    const listing = [...await fetchItems({
        "query":`${permalink}`,
        "active":"1"

    })][0];
    

    if (listing){

        const categories = listing.categories
        .map( object=> object.slug );


        // edit at your own risk o.O

        const getAllItems = async(categoryArray:string[]) =>{

                let array:Product[]=[]; 
                for (const category of categoryArray){
                    array=[
                        ...array,
                        
                        ...await fetchItems({
                        "category_slug":category,
                        "limit":`${limit}`,
                        "active":"1"

                        })
                          
                    ]


                }
                const itemIDs = [...new Set(array.map(product=>product.id))];
                const itemIncluded = itemIDs.map(product=>0);
                return array.filter(
                    product => {
                        if (itemIncluded[itemIDs.indexOf(product.id)]==0){
                            itemIncluded[itemIDs.indexOf(product.id)]=1; //basically mark that the product was added to the final array.
                            return product;
                        }
                    }
                )


            } 
        

        const similar = categories.length>0
            ?await getAllItems(categories)
            :await fetchItems({
                "limit":`${limit}`,
                "sortBy":"updated_at",
                "active":"1"
            })




        return (
            <ProductPage similar={similar} product={listing}/>
        )

    }
    else{
        return  (<main>Item not found component</main>)

    }
    

}

export default ItemPage;