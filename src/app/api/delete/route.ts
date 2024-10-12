import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest){
    try {
        await dbConnect()
        const { todoId  } = await request.json();
    
       const todo = await todoModel.findOne({_id:todoId}) 
       await todo?.deleteOne()
       return NextResponse.json({
        message:'Todo Deleted Successfully'
       },{status:201})

    } catch (error) {
       console.log(error)
       return NextResponse.json({
        message:'Internal Server Error'
       }) 
    }
}