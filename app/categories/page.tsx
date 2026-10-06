import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

export const metadata: Metadata = { title: "Shop Categories", description: "Browse AI Manjeet products by category, from modern technology and fashion to beauty and home." };
const extras = [["Accessories", "Finishing touches that work harder", "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=900&q=85"], ["Lifestyle", "Small upgrades, everyday impact", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"]];

export default function Categories() { const all = [...categories, ...extras]; return <><section className="page-hero"><div className="section py-16 text-center sm:py-24"><span className="eyebrow">Browse your way</span><h1 className="heading mt-4 text-5xl sm:text-7xl">Shop by category.</h1><p className="mx-auto mt-5 max-w-xl text-lg text-[#5f695f]">Six focused collections. Plenty of possibilities.</p></div></section><section className="section grid gap-5 py-20 md:grid-cols-2 lg:grid-cols-3">{all.map(([name, copy, image]) => <Link key={name} href={`/shop?category=${encodeURIComponent(name)}`} className="group relative overflow-hidden rounded-[2rem]"><Image src={image} alt={`${name} products`} width={800} height={800} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="font-display text-3xl">{name}</p><p className="mt-2 text-sm text-white/70">{copy}</p><span className="mt-5 flex items-center gap-2 text-xs font-bold">SHOP NOW <ArrowRight className="h-4 w-4" /></span></div></Link>)}</section></>; }
