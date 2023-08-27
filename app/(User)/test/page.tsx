

import { Asset } from "@chec/commerce.js/types/asset";
import { getAllAssets } from "../(lib)/api/assets"
import Image from "next/image";
import { ImageForm } from "./FileForm";


export default async function Test(){

    const assets:Asset[] = await getAllAssets().then(res=>res["data"]);
    return (
        <>

        <h3 className="text-xl">Assets</h3>
        <ul className="grid grid-cols-3 justify-items-center gap-y-2">
            {assets.map(
                asset=>
                <li key={asset.id}>
                    <Image 
                        className="aspect-square" src={asset.url} height={50} width={50} alt="asset"/>
                </li>
            )}
        </ul>

        <ImageForm/>

            {/* {JSON.stringify(assets)} */}
        </>
    )
}

// const handleSubmit = async(formData: FormData) => {


// }