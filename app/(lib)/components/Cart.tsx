import { cookies } from "next/headers";
export const getCart = async()=>{
    const url = new URL(
        "https://api.chec.io/v1/carts"
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    const res=await fetch(url, {
        method: "GET",
        headers: headers,
    })
    
    if (!res.ok){
        throw new Error(`Fetch failed`);
    }

    return res.json();
}




const CartComponent = async() =>{

    console.log(cookies());
    const cart = await getCart();





    return (
        <>
            <div className="text-white"> 
                Your cart is {JSON.stringify(cart.id)}
            </div>
        </>
    )
}





export default CartComponent;