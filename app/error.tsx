'use client'
import Link from "next/link";
import {  useRouter } from "next/navigation";

export default function Error () {
    const router = useRouter();
    return(
        <>
            <h1>
                An error has occured, page may not exist.
            </h1>
            <button onClick={()=>{
                router.replace("/");
                //we may also need to trigger a refresh..
                //but not on the current path.
                //Link might be okay?
                //idk i think i had an error..

            }}>
                Reload
            </button>
        </>
    )
}
