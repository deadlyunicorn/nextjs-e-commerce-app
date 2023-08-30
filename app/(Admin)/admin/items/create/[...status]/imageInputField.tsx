"use client"

import { CoolButton } from "@/app/(Shared)/components/Global";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

export const ImageInput = () => {

    const [imageSource,setImageSource] = useState<string|undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const [assetID,setAssetID] = useState<string|undefined>(undefined);

    return (
        <div
            className="flex flex-col items-center justify-center gap-y-2 py-2 h-36">

                {imageSource&&
                <Image
                    src={imageSource || "/image.png"}
                    className="aspect-square"
                    width={50}
                    height={50}
                    id="thumbnail"
                    alt="Image to upload." />
                }
                

                <CoolButton>

                    <label
                        className="
                                px-2 py-1
                                cursor-pointer"
                        id="fileLabel"
                        htmlFor="imgFile">

                        Select an Image.

                    </label>
                </CoolButton>

                <input
                    className="hidden"
                    id="imgFile"
                    onChange={async(e:ChangeEvent)=>{
                            // @ts-ignore
                        const imgSource = URL.createObjectURL(e.target.files[0]);
                        setImageSource(imgSource);

                        setLoading(true);
                        await uploadImage(e)
                            .then(res=>{setAssetID(res)})
                            .catch(()=>{
                                setImageSource(undefined)
                                setAssetID(undefined);
                            });
                        setLoading(false);
                    }}
                    accept="image/*"
                    name="imgFile"
                    type="file" />

                {loading&&"Loading..."}

                <input 
                    hidden
                    value={assetID}
                    name="assetID"/>





        </div>
    )
}


const uploadImage = async(e:any) => {

    if (e.target.files && e.target.files.length > 0) {

        const toBase64 = (file: File): Promise<string> => (new Promise((res, err) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => (res(reader.result as string))
            reader.onerror = () => { alert("There was an error reading your file.") }
        }));
        


            const file = e.target.files[0];
            const fileName = e.target.files[0].name;

            const encodedFile: string = await toBase64(file)
                .then(res => res.slice(res.indexOf('base64,') + 'base64,'.length));


            if (encodedFile) {
                return await fetch("/admin/items/upload",{
                    method: "POST", 
                    body: JSON.stringify({binaryData:encodedFile,fileName:fileName}),
                })
                .then( async(res) => {
                    return await res.json().then(data=>{
                        return data["fileUpload"]["id"];
                    })
                })
                .catch(err=>{
                    alert("There was an error uploading your image (make sure it's <2MiB). Are you signed in with an admin account?");
                    throw "Upload error.";
                });
            }
        }




    }


