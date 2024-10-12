import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/route";
import userModel from "@/models/userModel";

export async function POST(request:NextRequest){
    try {
        await dbConnect()
        const { task, description } = await request.json();
       if(!task || !description){
        return NextResponse.json({
            message:'All Fields are required'
        },{status:400})
       }
       const userId = await getDataFromToken(request)
       if (!userId) {
        return NextResponse.json({
            message: 'User not found'
        }, { status: 404 });
    }
    
       await todoModel.create({
          task,
          description,
          status:'Pending',
          creator:userId
       })
       return NextResponse.json({
        message:'Todo created successfully'
       },{status:201})

    } catch (error) {
       console.log(error)
       return NextResponse.json({
        message:'Internal Server Error'
       }) 
    }
}