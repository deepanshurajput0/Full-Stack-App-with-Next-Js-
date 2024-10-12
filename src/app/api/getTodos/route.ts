import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/route";
export async function GET(request:NextRequest){
    try {
        await dbConnect()
       const userId = await getDataFromToken(request)
       const todos = await todoModel.find({creator:userId})

       return NextResponse.json(todos,{status:200})

    } catch (error) {
       console.log(error)
       return NextResponse.json({
        message:'Internal Server Error'
       }) 
    }
}