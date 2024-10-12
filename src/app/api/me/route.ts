import dbConnect from "@/lib/dbConnect";
import { getDataFromToken } from "@/helpers/route";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    await dbConnect()
   const userId = await getDataFromToken(request)
   const user = await userModel.findOne({_id:userId}).select('-password')
   return NextResponse.json({
    message:'User found',
    data:user
   })

}