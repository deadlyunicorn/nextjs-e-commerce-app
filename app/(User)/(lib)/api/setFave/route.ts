import { NextResponse } from "next/server";
import { addFavorite } from "../favorites";
import { OPERATION } from "./types";



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