import { commerce } from "../api/commerce";

const CartComponent = async() =>{

    const url = new URL(
        "https://api.chec.io/v1/carts"
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    const cart = await fetch(url, {
        method: "GET",
        headers: headers,
    })
    .then(response => {
        return response.json();
    })



    return (
        <>
            <div>
                Your cart is {JSON.stringify(cart.id)}
            </div>
        </>
    )
}


export default CartComponent;