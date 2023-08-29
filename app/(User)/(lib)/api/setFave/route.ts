import { NextResponse } from "next/server";
import { addFavorite } from "../favorites";

export const OPERATION = {
    SUCCESS : 1,
    ERROR : 0
}


type addToFavoritesRequest = {
    email : string,
    value : string
}

export async function PUT(values:any){

    const body:addToFavoritesRequest = await values.json();

    try{
        const res = await addFavorite(body.email,body.value);
        return NextResponse.json({res:OPERATION.SUCCESS});
    }
    catch{
        return NextResponse.json({res:OPERATION.ERROR});
    }

    


}