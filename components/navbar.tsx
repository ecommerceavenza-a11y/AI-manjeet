"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["Home", "/"], ["Services", "/services"], ["How it works", "/#process"],
  ["About", "/about"], ["Insights", "/blog"], ["Contact", "/contact"],
];

export function Brand() {
  return <Link href="/" aria-label="AI Manjeet home" className="flex shrink-0 items-center">
    <Image src="/ai-manjeet-logo.png" alt="AI Manjeet" width={2172} height={724} priority className="h-auto w-[138px] sm:w-[158px]" />
  </Link>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <>
    <div className="bg-[#172019] px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-white">Free 30-minute consultation · Get a customized digital marketing plan</div>
    <header className="sticky top-0 z-50 border-b border-[#e3e3de] bg-[#faf9f7]/92 text-[#172019] backdrop-blur-xl">
      <nav className="section flex h-[68px] items-center justify-between" aria-label="Main navigation"><Brand /><div className="hidden items-center gap-7 text-sm font-medium lg:flex">{links.map(([label, href]) => <Link className="transition hover:text-[#66816a]" href={href} key={label}>{label}</Link>)}</div><div className="flex items-center gap-2"><Link href="/contact" className="hidden items-center gap-2 rounded-full bg-[#172019] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#385140] sm:flex"><CalendarCheck className="h-4 w-4" /> BOOK A FREE CALL</Link><button aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle navigation" className="icon-button lg:hidden" onClick={() => setOpen(!open)}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div></nav>
      {open && <div id="mobile-navigation" className="fixed inset-x-0 top-[104px] h-[calc(100vh-104px)] overflow-y-auto border-t border-[#e3e3de] bg-[#faf9f7] px-5 py-6 lg:hidden"><div className="grid gap-1">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-[#eef1eb]" href={href} key={label}>{label}</Link>)}</div><Link onClick={() => setOpen(false)} href="/contact" className="primary-button mt-6 w-full">BOOK A FREE CONSULTATION</Link></div>}
    </header>
  </>;
}
