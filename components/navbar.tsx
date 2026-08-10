"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui";
const links=["Home","About","Services","Blog","Contact"];
export function Brand(){return <Link href="/" aria-label="Avenza home" className="flex items-center"><Image src="/avenza-logo-header.png" alt="Avenza" width={180} height={72} priority className="h-12 w-[180px] object-contain"/></Link>}
export function Navbar(){const [open,setOpen]=useState(false);return <header className="sticky top-0 z-50 border-b border-white/[.06] bg-[#0a0a0a]/75 backdrop-blur-xl"><nav className="section flex h-[72px] items-center justify-between"><Brand/><div className="hidden items-center gap-7 text-sm text-gray-300 md:flex">{links.map(x=><Link className="transition hover:text-white" href={x==="Home"?"/":"/"+x.toLowerCase()} key={x}>{x}</Link>)}</div><div className="hidden md:block"><Button href="/contact" className="px-4 py-2.5">Book a consultation</Button></div><button aria-label="Toggle navigation" className="md:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></nav>{open&&<div className="section border-t border-white/10 py-5 md:hidden">{links.map(x=><Link onClick={()=>setOpen(false)} className="block py-3 text-gray-300" href={x==="Home"?"/":"/"+x.toLowerCase()} key={x}>{x}</Link>)}<Button href="/contact" className="mt-3 w-full">Book a consultation</Button></div>}</header>}
