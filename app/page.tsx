import { createClient } from "next-sanity"
import Image from "next/image";

const client = createClient({
  projectId:"ivcdtgt3",
  dataset: "production",
  apiVersion: "2023-06-27",
  useCdn: true //higher costs if false but faster content
});


export default async function Home() {
  
  const items = await client.fetch(`*[_type == "item"]`);


  return (
    <main className=" flex flex-col items-center ">
      <div className=" max-w-md text-center">
      HELLO WORLD AND WELCOME TO MY WEBSTORE


      {items.map(
        (item:any)=>(
          
          <div key={item._id} className="max-w-[200px]">

            <Image src={item.image} 
            alt={item.alt} width={200} height={200}
            className="rounded-md" />
            
            <div className="my-4 ">

              <p className="font-normal text-xl">
                {item.name} ${Math.round(item.price*0.8*100)/100}
                <span className="text-xs"> (χωρίς ΦΠΑ)</span>
              </p>

              <button className="w-full bg-slate-300 mx-2 p-2 rounded-md">
                BUY
              </button> 
            </div>
          </div>
        )
      )}


      </div>
    </main>

  )
} 
