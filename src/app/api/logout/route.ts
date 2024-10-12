import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const res = NextResponse.json({
        message:'Logout Successfully',
        success:true
    },{status:200})
    res.cookies.set('token','',{
        httpOnly:true,
        expires: new Date(0)
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
