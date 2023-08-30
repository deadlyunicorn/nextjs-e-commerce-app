import { NextResponse } from "next/server";
import { addFavorite } from "../favorites";
import { OPERATION } from "./types";
import { revalidatePath } from "next/cache";



type addToFavoritesRequest = {
    email : string,
    value : string
}

export async function PUT(values:any){

    const body:addToFavoritesRequest = await values.json();

    revalidatePath('/myProfile');


    try{
        const res = await addFavorite(body.email,body.value);
        return NextResponse.json({res:OPERATION.SUCCESS});
    }
    catch{
        return NextResponse.json({res:OPERATION.ERROR});
    }

    


}