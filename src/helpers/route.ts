import jwt from 'jsonwebtoken'

import { NextRequest, NextResponse } from 'next/server'


export const getDataFromToken =async(request:NextRequest)=>{
    const token = request.cookies.get('token')?.value || ''
    if(!token){
        return NextResponse.json({
            message:'No Token Found'
        },{status:400})
    }
    const decodedToken =  jwt.verify(token,process.env.JWT_SECRET!)
    return decodedToken._id 
}