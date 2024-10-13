import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest){
    try {
        await dbConnect()
        const { todoId  } = await request.json();
    
       const todo = await todoModel.findOne({_id:todoId})
       if(todo?.status === 'Pending'){
        todo.status = 'Completed'
       }else if(todo?.status === 'Completed'){
         todo.status = 'Pending'
       }
        await todo?.save()
       return NextResponse.json({
        message:'Todo Updated Successfully'
       },{status:201})

    } catch (error) {
       console.log(error)
       return NextResponse.json({
        message:'Internal Server Error'
       }) 
    }
}