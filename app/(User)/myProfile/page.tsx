import { getOrders } from "@/app/(Admin)/admin/orders/api/fetchOrders";
import { CoolButton, CoolLink, SignOutButton } from "@/app/(Shared)/components/Global";
import { Order } from "@chec/commerce.js/types/order";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getUserFavorites } from "../(lib)/api/favorites";

const UserPage = async()=>{


 
    const session = await getServerSession();
    if (!session){
        redirect('/signin');
    }

    const userOrders:Order[] = await getOrders({
        limit:String(10),
        page: String(1),
        query: session.user?.email+""
      });

    const userFavorites = await getUserFavorites('Johhny');
    

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


            </UserSection>

            <UserSection>

                <h1 className="text-2xl">Orders</h1>
                {(userOrders&&userOrders.length>0)
                ?<p>Great there are orders!</p>
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

export default UserPage;