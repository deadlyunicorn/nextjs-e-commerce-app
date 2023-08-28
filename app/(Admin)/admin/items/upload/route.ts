import { NextRequest, NextResponse } from "next/server";
import { uploadAsset } from "../../../api/assets";

type imageUploadBody = {
    binaryData:string,
    fileName:string
}

export async function POST(data:NextRequest) {

    //can't directly call uploadAsset() from client.
    //only via route.


    const fileUpload = await data.json()
        .then( async(body:imageUploadBody) => {
            return await uploadAsset(body.binaryData,body.fileName);
    });

    return NextResponse.json({fileUpload});

}