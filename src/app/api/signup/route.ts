import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request:NextRequest){
      try {
        await dbConnect()
        const { name, email, password } = await request.json()
        if(!name || !email || !password){
            return NextResponse.json({message:'All Fields are required'},{status:400})
        }
        const user = await userModel.findOne({email})
        if(user){
            return NextResponse.json({message:'User Already Exists'},{status:401})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await userModel.create({
            name,
            email,
            password:hashedPassword
        })
        return NextResponse.json({
            message:'User created successfully'
        },{status:201})
      } catch (error) {
        console.log(error)
        return NextResponse.json({message:'Internal Server Error'},{status:500})
      }

}