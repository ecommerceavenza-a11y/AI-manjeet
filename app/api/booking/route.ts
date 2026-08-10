import { NextResponse } from "next/server";
export async function POST(req:Request){const body=await req.json().catch(()=>null);if(!body?.email)return NextResponse.json({success:false,message:'Email is required.'},{status:400});return NextResponse.json({success:true,reference:`AV-${Date.now().toString(36).toUpperCase()}`},{status:201});}
