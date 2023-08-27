"use client"

import { CoolButton } from "@/app/(Shared)/components/Global";
import Image from "next/image";
import { FormEvent } from "react";

export const ImageForm = () => {

    return (
        <form 
            className="flex flex-col items-center gap-y-2 py-2"
            onSubmit={handleSubmit}>


                <h2 className="text-2xl underline my-4">Upload an image</h2>

            

                <Image
                    className="aspect-square"
                    src={""}
                    width={50} 
                    height={50} 
                    id="thumbnail"
                    alt="Image to upload."/>

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
                    onChange={handleFiles}
                    accept="image/*"
                    name="image"
                    type="file"/>


            
                <br/>
            <button>Submit</button>
            
        </form>
    )
}

const handleFiles = () => {


        try{
            //@ts-ignore
            const imgSource = URL.createObjectURL(document.querySelector('#image').files[0]);
            //@ts-ignore
            document.querySelector('#thumbnail').src = imgSource;
        }
        catch(e){}


        // document.querySelector('#fileLabel').textContent = 
}


    // for (const entry of  formData.entries()){
    // // @ts-ignore
    // if (entry[1]!=undefined && entry[1].size != undefined){
    // // @ts-ignore
    // if (entry[1].size > 2000000){
    //             throw "File size should be under 2MB."
    //         }
    //         else {
    //             file=entry;
    //         }
    //     }
        
    // };

    // URL.createObjectURL(file)); // we will use this to show the preview of the image
  

const handleSubmit = (e:FormEvent)=> {
    
    e.preventDefault();

    //@ts-ignore
    const fileSubmitElement:HTMLInputElement = document.querySelector('#image');

    if (fileSubmitElement.files && fileSubmitElement.files.length > 0 ){
        alert("ahoy");
        
        const file = fileSubmitElement.files[0];

        const reader = new FileReader();
        reader.onload = (e)=>{
            console.log(e.target?.result);
        }
        reader.readAsBinaryString(file);


    }




}