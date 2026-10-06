"use client";

import Image from "next/image";
import Link from "next/link";
import { Bot, Search, Send, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products.filter((product) => [product.name, product.category, product.brand, product.description].join(" ").toLowerCase().includes(term)).slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (open) window.setTimeout(() => input.current?.focus(), 50);
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);

  if (!open) return null;
  return <div className="fixed inset-0 z-[80] bg-[#172019]/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search products" onMouseDown={onClose}>
    <div className="mx-auto mt-[8vh] max-w-2xl overflow-hidden rounded-3xl bg-[#faf9f7] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
      <div className="flex items-center gap-3 border-b border-[#dedfd9] px-5">
        <Search className="h-5 w-5 text-[#768076]" /><input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent py-5 outline-none" placeholder="Search products, categories, or brands…" />
        <button aria-label="Close search" onClick={onClose} className="icon-button"><X className="h-5 w-5" /></button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-3">
        <p className="px-2 pb-3 pt-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#758075]">{query ? `${results.length} matching products` : "Popular right now"}</p>
        {results.map((product) => <Link onClick={onClose} key={product.id} href={`/shop/${product.id}`} className="flex items-center gap-4 rounded-2xl p-2 hover:bg-[#eef1eb]">
          <Image src={product.image} alt="" width={72} height={72} className="h-16 w-16 rounded-xl object-cover" />
          <div className="min-w-0 flex-1"><p className="truncate font-semibold">{product.name}</p><p className="mt-1 text-xs text-[#758075]">{product.brand} · {product.category}</p></div>
          <strong>${product.price}</strong>
        </Link>)}
        {!results.length && <div className="px-4 py-12 text-center"><p className="font-semibold">No exact match yet.</p><p className="mt-2 text-sm text-[#758075]">Try “headphones”, “home”, or “beauty”.</p></div>}
      </div>
    </div>
  </div>;
}

const prompts = ["A gift under $100", "Upgrade my home", "Best for travel"];

export function ShoppingAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("Tell me what you’re shopping for, your budget, or the kind of feeling you want.");
  const recommendations = useMemo(() => {
    const term = (message + " " + answer).toLowerCase();
    if (term.includes("home")) return products.filter((p) => p.category === "Home & Living").slice(0, 2);
    if (term.includes("travel") || term.includes("gift") || term.includes("100")) return products.filter((p) => p.price <= 100).slice(0, 2);
    return products.slice(0, 2);
  }, [answer, message]);

  function ask(text: string) {
    setMessage(text);
    const lower = text.toLowerCase();
    setAnswer(lower.includes("home") ? "For a calm home refresh, I’d pair soft ambient light with one sculptural piece."
      : lower.includes("travel") ? "For travel, compact and versatile wins. These are lightweight, useful, and easy to love."
      : lower.includes("gift") || lower.includes("100") ? "Here are thoughtful crowd-pleasers under $100, chosen for usefulness and presentation."
      : "I found a couple of strong matches. Refine by budget, color, or category and I’ll narrow it further.");
  }

  return <div className="fixed bottom-5 right-5 z-40">
    {open && <section className="mb-3 w-[min(360px,calc(100vw-40px))] overflow-hidden rounded-3xl border border-[#dfe1da] bg-[#faf9f7] shadow-2xl" aria-label="AI shopping assistant">
      <header className="flex items-center gap-3 bg-[#172019] p-4 text-white"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Sparkles className="h-4 w-4" /></span><div><p className="text-sm font-semibold">AI Manjeet Assistant</p><p className="text-[11px] text-white/60">Smart help, zero pressure</p></div><button onClick={() => setOpen(false)} className="ml-auto" aria-label="Close assistant"><X className="h-4 w-4" /></button></header>
      <div className="max-h-[360px] overflow-y-auto p-4"><p className="rounded-2xl rounded-tl-sm bg-[#eef1eb] p-3 text-sm leading-6">{answer}</p><div className="mt-3 grid grid-cols-2 gap-2">{recommendations.map((product) => <Link key={product.id} href={`/shop/${product.id}`} className="rounded-xl border border-[#dfe1da] bg-white p-2"><Image src={product.image} alt="" width={150} height={110} className="aspect-[4/3] w-full rounded-lg object-cover" /><span className="mt-2 block truncate text-xs font-semibold">{product.name}</span><span className="text-xs text-[#758075]">${product.price}</span></Link>)}</div><div className="mt-3 flex flex-wrap gap-2">{prompts.map((prompt) => <button onClick={() => ask(prompt)} key={prompt} className="rounded-full border border-[#d7d9d2] px-3 py-1.5 text-[11px] hover:bg-white">{prompt}</button>)}</div></div>
      <form onSubmit={(event) => { event.preventDefault(); if (message.trim()) ask(message); }} className="flex gap-2 border-t border-[#dfe1da] p-3"><input value={message} onChange={(event) => setMessage(event.target.value)} className="min-w-0 flex-1 rounded-full border border-[#d7d9d2] bg-white px-4 py-2 text-sm outline-none" placeholder="Ask for a recommendation…" /><button className="grid h-9 w-9 place-items-center rounded-full bg-[#172019] text-white" aria-label="Send"><Send className="h-4 w-4" /></button></form>
    </section>}
    <button onClick={() => setOpen(!open)} className="ml-auto flex items-center gap-2 rounded-full bg-[#172019] px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5" aria-expanded={open}><Bot className="h-4 w-4" /> Ask AI Manjeet</button>
  </div>;
}
