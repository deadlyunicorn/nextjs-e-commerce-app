import { NextResponse } from "next/server";
import { addFavorite, databaseLog } from "../favorites";
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

export async function POST(values:any){
    const body:addToFavoritesRequest = await values.json();

    console.log(body);
    try{
        const res = await databaseLog(body.value);
        return NextResponse.json({res:OPERATION.SUCCESS});
    }
    catch{
        return NextResponse.json({res:OPERATION.ERROR});
    }


}