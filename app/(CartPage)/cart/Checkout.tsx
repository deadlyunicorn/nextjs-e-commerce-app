'use client'

import { useRouter } from "next/navigation"

const Checkout = ({url}:{url:string}) => {
    

    const router=useRouter();

    return (
        <button 
            className="
            bg-white rounded-md
            px-2 py-1
            uppercase"
            onClick={()=>{
                router.replace(url);
            }}>
            Checkout
        </button>
    )
}

export default Checkout;