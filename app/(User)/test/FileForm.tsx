"use client"

import { CoolButton } from "@/app/(Shared)/components/Global";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { uploadAsset } from "../../(Admin)/api/assets";

export const ImageForm = () => {

    const [imageSource,setImageSource] = useState<string|undefined>(undefined);
    const [loading, setLoading] = useState(false);

    return (
        <div
            className="flex flex-col items-center gap-y-2 py-2">


            <h2 className="text-2xl underline my-4">Upload an image</h2>




                {imageSource&&
                <Image
                    src={imageSource}
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
                        htmlFor="image">

                        Select an Image.

                    </label>
                </CoolButton>

                <input
                    className="hidden"
                    id="image"
                    onChange={async(e:ChangeEvent)=>{
                            // @ts-ignore
                        const imgSource = URL.createObjectURL(e.target.files[0]);
                        setImageSource(imgSource);

                        setLoading(true);
                        await uploadImage(e).catch(()=>{setImageSource(undefined)});
                        setLoading(false);
                    }}
                    accept="image/*"
                    name="image"
                    type="file" />

                {loading&&"Loading..."}





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
                await fetch("admin/items/upload",{
                    method: "POST", 
                    body: JSON.stringify({binaryData:encodedFile,fileName:fileName}),
                })
                .then( async(res) => {
                    console.log(`Your image was successfully uploaded`,await res.json());
                })
                .catch(err=>{
                    alert("There was an error uploading your image (make sure it's <2MiB).");
                    throw "Upload error.";
                });
            }
        }




    }


