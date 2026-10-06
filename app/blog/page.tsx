import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/content";

export const metadata: Metadata = { title: "AI Marketing Insights", description: "Simple, practical guidance on AI marketing, content, automation, lead generation, and growth." };

export default function Blog() {
  const [featured, ...rest] = posts;
  return <>
    <section className="page-hero"><div className="section py-20 text-center sm:py-28"><span className="eyebrow">Practical marketing insights</span><h1 className="heading mt-5 text-5xl sm:text-7xl">Use AI with more clarity and less noise.</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#5f695f]">Simple advice for saving time, attracting better leads, and building a marketing system that fits your business.</p></div></section>
    <section className="section py-20"><div className="mb-9 flex gap-2 overflow-x-auto pb-2 text-xs font-semibold">{["All insights", "AI Strategy", "Automation", "Lead Generation", "Content", "SEO"].map((category, index) => <span key={category} className={`whitespace-nowrap rounded-full px-4 py-2 ${index === 0 ? "bg-[#172019] text-white" : "border border-[#d7d9d2] bg-white"}`}>{category}</span>)}</div>
      <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] bg-[#172019] text-white md:grid-cols-2"><Image src={featured.image} alt="A business team planning its marketing strategy" width={900} height={650} className="h-full min-h-[330px] w-full object-cover transition duration-500 group-hover:scale-[1.02]" /><div className="flex flex-col justify-center p-8 sm:p-12"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#b7cbb5]">{featured.category}</span><h2 className="heading mt-5 text-4xl leading-tight">{featured.title}</h2><p className="mt-5 leading-7 text-white/65">{featured.excerpt}</p><p className="mt-7 text-sm text-white/50">By Shirish Rumba · {featured.date} · {featured.read}</p><span className="mt-8 flex items-center gap-2 text-sm font-semibold">Read the insight <ArrowRight className="h-4 w-4" /></span></div></Link>
      <div className="mt-10 grid gap-7 md:grid-cols-3">{rest.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug} className="group"><div className="overflow-hidden rounded-2xl"><Image src={post.image} alt="" width={700} height={480} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" /></div><span className="mt-5 block text-[10px] font-bold uppercase tracking-[.16em] text-[#718071]">{post.category}</span><h2 className="mt-3 font-display text-2xl leading-snug">{post.title}</h2><p className="mt-3 text-sm leading-6 text-[#657065]">{post.excerpt}</p><p className="mt-5 text-xs text-[#828982]">{post.date} · {post.read}</p></Link>)}</div>
    </section>
  </>;
}
