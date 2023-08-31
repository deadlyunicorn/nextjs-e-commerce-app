import { getOrders } from "@/app/(Admin)/admin/orders/api/fetchOrders";
import { CoolButton, CoolLink, SignOutButton } from "@/app/(Shared)/components/Global";
import { Order } from "@chec/commerce.js/types/order";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getFavorites } from "../(lib)/api/favorites";
import { fetchItems } from "../(lib)/api/items";
import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import Link from "next/link";
import { ListOrders, getDate } from "@/app/(Admin)/admin/orders/[page]/[...sortBy]/page";

const MyProfile = async()=>{


 
    const session = await getServerSession();
    if (!session){
        redirect('/signin');
    }

    const email = session.user?.email;

    const userOrders:Order[] = await getOrders({
        limit:String(10),
        page: String(1),
        query: email+"",
        sortDirection: "desc"
      });

    
    const favorites = email
    ?await getFavorites(email)
        .then(async(favorites)=>{
            if (favorites&&favorites.length>0){
                return await fetchItems(
                    // @ts-ignore
                    {query:favorites}
                )
            }
        }

        )
        .catch(e=>[])
        :null;
    
    

    return (
        <main className="flex flex-col w-full gap-y-4">
            
            <UserSection>

                <h1 className="text-2xl">User profile</h1>
                <p>Hello {session.user?.name}!
                    <br/>You are signed in with the email
                    <br/><em>{session.user?.email}</em>
                </p>

                <div className="
                    justify-center
                    flex w-full 

                    text-blue-600
                    hover:text-blue-500
                    hover:dark:text-blue-300
                    dark:text-blue-400">
                        <SignOutButton/>
                </div>
            </UserSection>


            <UserSection>
                <h1 className="text-2xl">Favorites</h1>

                {
                (favorites&&favorites.length>0)
                ?
                <ul className="
                    py-4 px-2
                    gap-y-2
                    justify-items-center
                    place-items-center

                    grid-cols-2
                    xs:grid-cols-3
                    sm:grid-cols-4
                    xl:grid-cols-5
                    grid ">
                    {favorites.map(
                        item=>
                        <li 
                            key={item.id}>

                            <Link 
                            href={`/product/${item.permalink}`}
                            className="
                            hover:underline
                            hover:brightness-110
                            hover:saturate-150
                            gap-y-2 my-2
                            flex flex-col
                            items-center
                            w-full h-full">
                            <Image
                                
                                alt={`Image of ${item.name}`}
                                className="w-20 h-20 bg-white rounded-md"
                                width={80} height={80} 
                                src={item.image?.url||"/image.png"}/>
                            {item.name}
                            </Link>
                        </li>)}
                </ul>
                
                :<p>You don&quot;t have any favorites yet.</p>}



            </UserSection>

            <UserSection>

                <h1 className="text-2xl">Orders</h1>
                {(userOrders&&userOrders.length>0)
                ?
                <ul>
                    {ListOrders(userOrders)}
                </ul>
                :<p>You haven&apos;t made any orders yet!</p>
                }

            </UserSection>
        </main>
    )
}

const UserSection = ({children}:{children:ReactNode}) => (
            <section className="
                flex flex-col 
                w-full border
                gap-y-2 py-2
                rounded-md">

                    {children}
            </section>
)

export default MyProfile;