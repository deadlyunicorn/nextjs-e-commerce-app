'use client'

import { CoolButton } from "@/app/(Shared)/components/Global";
import { useRouter } from "next/navigation"

const Checkout = ({url}:{url:string}) => {
    

    const router=useRouter();

    return (
        <div className="w-full flex justify-center">
        <CoolButton>
            <button 
                className="
                rounded-md
                px-2 py-1
                uppercase"
                onClick={()=>{
                    router.replace(url);
                }}>
                Checkout
            </button>
        </CoolButton>
        </div>
    )
}

export default Checkout;