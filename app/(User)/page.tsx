import { Suspense } from "react";
import Item_StoreFront, { Store_Front_Fallback } from "./(lib)/components/homepage/store_front";
import { fetchItems } from "./(lib)/api/items";



export default async function Home() {

  const limit = 20;

  const items = await fetchItems({
    "limit":`${limit}`,
  });


  return (
    <main>
      <div>

     
     


        <div className="
          product-list-div">

          <Suspense fallback={<Store_Front_Fallback/>}>
            {items.map(
                (item,index)=>(
                  // <Store_Front_Fallback key={index}/>
                  item.inventory.available>0&&
                  <Item_StoreFront item={item} key={item.id}/>
                )
              )}

          </Suspense>
        </div>

      </div>
    </main>

  )
} 
