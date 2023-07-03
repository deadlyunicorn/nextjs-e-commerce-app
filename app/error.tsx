'use client'
import Link from "next/link";

export default function Error () {
    return(
        <>
            <h1>
                An error has occured, page may not exist.
            </h1>
            <Link href='/'>
                Reload
            </Link>
        </>
    )
}