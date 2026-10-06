import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/content";

export const metadata: Metadata = { title: "AI Marketing Services", description: "Practical AI marketing strategy, content, lead generation, automation, SEO, and email services for growing businesses." };

export default function Services() {
  return <>
    <section className="page-hero"><div className="section py-20 text-center sm:py-28"><span className="eyebrow">AI-powered digital marketing services</span><h1 className="heading mx-auto mt-5 max-w-4xl text-5xl leading-[.98] sm:text-7xl">Solve the marketing problems slowing your growth.</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f695f]">Get the strategy, content, lead generation, and automation you need to reach the right customers and turn more interest into sales.</p></div></section>
    <section className="section py-20"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((service) => { const Icon = service.icon; return <article className="card flex h-full flex-col p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#172019]/5" key={service.slug}><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e9f0e5]"><Icon className="h-6 w-6 text-[#5f795f]" /></span><h2 className="mt-7 font-display text-2xl tracking-tight">{service.title}</h2><p className="mt-3 text-sm leading-6 text-[#657065]">{service.description}</p><ul className="mt-6 space-y-2 text-sm">{service.benefits.map((benefit) => <li className="flex gap-2" key={benefit}><Check className="h-4 shrink-0 text-[#678268]" />{benefit}</li>)}</ul><Link className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#4f6c54]" href={`/services/${service.slug}`}>Learn more <ArrowRight className="h-4 w-4" /></Link></article>; })}</div></section>
    <section className="section pb-20"><div className="rounded-[2rem] bg-[#172019] px-7 py-12 text-center text-white sm:px-12"><p className="eyebrow !text-[#b9ceb9]">Not sure where to start?</p><h2 className="heading mt-4 text-4xl sm:text-5xl">Not sure what your business needs first?</h2><p className="mx-auto mt-4 max-w-xl text-white/65">Book a free consultation. I’ll review your goals and challenges, then outline the most useful priorities for your next 90 days.</p><Link href="/contact" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-xs font-bold text-[#172019]">BOOK MY FREE CONSULTATION</Link></div></section>
  </>;
}
