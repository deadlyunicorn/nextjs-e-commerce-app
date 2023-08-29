import { NextResponse } from "next/server";
import { removeFavorite } from "../favorites";
import { OPERATION } from "../setFave/types";



type addToFavoritesRequest = {
    email : string,
    value : string
}

export async function PUT(values:any){

    const body:addToFavoritesRequest = await values.json();

    try{
        const res = await removeFavorite(body.email,body.value);
        return NextResponse.json({res:OPERATION.SUCCESS});
    }
    catch{
        return NextResponse.json({res:OPERATION.ERROR});
    }

    


}