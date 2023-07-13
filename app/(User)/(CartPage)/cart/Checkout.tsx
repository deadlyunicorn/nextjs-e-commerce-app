'use client'

import { useRouter } from "next/navigation"

const Checkout = ({url}:{url:string}) => {
    

    const router=useRouter();

    return (
        <button 
            className="
            bg-slate-50 rounded-md
            dark:bg-black dark:bg-opacity-40
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