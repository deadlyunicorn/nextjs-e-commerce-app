import { NextResponse } from "next/server";
import { removeFavorite } from "../favorites";
import { OPERATION } from "../setFave/types";
import { revalidatePath } from "next/cache";



type addToFavoritesRequest = {
    email : string,
    value : string
}

export async function PUT(values:any){

    const body:addToFavoritesRequest = await values.json();

    revalidatePath('/myProfile');

    try{
        const res = await removeFavorite(body.email,body.value);
        return NextResponse.json({res:OPERATION.SUCCESS});
    }
    catch{
        return NextResponse.json({res:OPERATION.ERROR});
    }

    


}