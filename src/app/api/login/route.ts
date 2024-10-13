import userModel from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "All Fields are required" },
        { status: 400 }
      );
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Email & Password" },
        { status: 401 }
      );
    }
    const isCompare = await bcrypt.compare(password, user.password);
    console.log(isCompare)
    if (!isCompare) {
      return NextResponse.json(
        { message: "Invalid Email & Password" },
        { status: 401 }
      );
    }
    const token =  await jwt.sign({_id:user.id},process.env.JWT_SECRET!,{expiresIn:'2d'})

    const res =  NextResponse.json(
      { message: "User Logged in Succcessfully", user:user },
      { status: 200 }
    );
    res.cookies.set('token',token,{
        httpOnly:true
    })
    return res
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
