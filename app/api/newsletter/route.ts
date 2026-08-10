import { NextResponse } from "next/server";
import { z } from "zod";
export async function POST(req:Request){try{const {email}=z.object({email:z.string().email()}).parse(await req.json());return NextResponse.json({success:true,email},{status:201});}catch{return NextResponse.json({success:false,message:'A valid email is required.'},{status:400});}}
