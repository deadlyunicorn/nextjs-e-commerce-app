import { NextRequest, NextResponse } from "next/server";
import { uploadAsset } from "../../../api/assets";
import { getServerSession } from "next-auth";

type imageUploadBody = {
    binaryData:string,
    fileName:string
}

export async function POST(data:NextRequest) {

    //can't directly call uploadAsset() from client.
    //only via route.

    const session =  await getServerSession();
    const email = session?.user?.email||"";

    const fileUpload = await data.json()
        .then( async(body:imageUploadBody) => {
            return await uploadAsset(body.binaryData,body.fileName,email);
    });

    return NextResponse.json({fileUpload});

}