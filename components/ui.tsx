"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
export function Button({href, children, className, variant="primary"}:{href:string;children:React.ReactNode;className?:string;variant?:"primary"|"secondary"}) { return <Link href={href} className={cn("group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5",variant==="primary"?"bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20":"border border-white/15 bg-white/[.03] text-white hover:bg-white/[.08]",className)}>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link> }
export function Reveal({children,className}:{children:React.ReactNode;className?:string}) { return <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-40px"}} transition={{duration:.55}} className={className}>{children}</motion.div> }
export function SectionTitle({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}) { return <div className="max-w-2xl"><span className="eyebrow">{eyebrow}</span><h2 className="heading mt-5 text-4xl font-medium leading-tight sm:text-5xl">{title}</h2>{copy&&<p className="mt-5 text-lg leading-8 text-gray-400">{copy}</p>}</div> }
