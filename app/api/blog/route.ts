import { NextResponse } from "next/server";
import { posts } from "@/data/content";
export function GET(){return NextResponse.json({data:posts,total:posts.length});}
