"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export default function Shop() {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [max, setMax] = useState(300);
  const [rating, setRating] = useState(0);
  const [saleOnly, setSaleOnly] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => { const value = new URLSearchParams(window.location.search).get("category"); if (value) setCategory(value); }, []);
  const list = useMemo(() => {
    const term = query.toLowerCase();
    return products.filter((product) => (category === "All" || product.category === category) && (brand === "All" || product.brand === brand) && product.price <= max && product.rating >= rating && (!saleOnly || Boolean(product.oldPrice)) && [product.name, product.brand, product.category].join(" ").toLowerCase().includes(term)).sort((a, b) => sort === "Price: Low to High" ? a.price - b.price : sort === "Price: High to Low" ? b.price - a.price : sort === "Best Rated" ? b.rating - a.rating : sort === "Most Popular" ? b.reviews - a.reviews : sort === "Newest" ? products.indexOf(b) - products.indexOf(a) : 0);
  }, [brand, category, max, query, rating, saleOnly, sort]);
  function reset() { setCategory("All"); setBrand("All"); setMax(300); setRating(0); setSaleOnly(false); setQuery(""); }

  return <div className="text-[#172019]"><header className="page-hero"><div className="section py-16"><p className="eyebrow">The collection</p><h1 className="heading mt-4 text-5xl sm:text-7xl">Find your next favorite.</h1><p className="mt-5 max-w-xl text-[#687168]">Thoughtfully sourced pieces for better everyday rituals.</p><label className="mt-7 flex max-w-xl items-center gap-3 rounded-full border border-[#d6dad2] bg-white px-5 shadow-sm"><Search className="h-4 w-4 text-[#758075]" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none" placeholder="Search products, brands, or categories" /></label></div></header>
    <div className="section grid gap-8 py-14 lg:grid-cols-[230px_1fr]"><aside className="h-fit rounded-2xl border border-[#dedfd9] bg-white p-5 lg:sticky lg:top-28"><div className="flex items-center justify-between"><strong>Filters</strong><SlidersHorizontal className="h-4 w-4" /></div><button onClick={reset} className="mt-4 flex items-center gap-1 text-xs underline">Reset all <X className="h-3 w-3" /></button><FilterTitle>Category</FilterTitle><div className="mt-3 grid gap-2">{["All", "Fashion", "Electronics", "Beauty", "Home & Living", "Accessories", "Lifestyle"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`text-left text-sm ${category === item ? "font-bold text-[#172019]" : "text-[#687168]"}`}>{item}</button>)}</div><FilterTitle>Brand</FilterTitle><select value={brand} onChange={(event) => setBrand(event.target.value)} className="mt-3 w-full rounded-lg border border-[#dedfd9] bg-white px-3 py-2 text-sm"><option>All</option>{Array.from(new Set(products.map((product) => product.brand))).map((item) => <option key={item}>{item}</option>)}</select><FilterTitle>Price up to ${max}</FilterTitle><input aria-label="Maximum price" className="mt-3 w-full accent-[#16261d]" type="range" min="40" max="300" step="10" value={max} onChange={(event) => setMax(+event.target.value)} /><FilterTitle>Rating</FilterTitle><select value={rating} onChange={(event) => setRating(+event.target.value)} className="mt-3 w-full rounded-lg border border-[#dedfd9] bg-white px-3 py-2 text-sm"><option value={0}>Any rating</option><option value={4.5}>4.5 & up</option><option value={4.8}>4.8 & up</option></select><label className="mt-7 flex items-center gap-2 text-sm"><input checked={saleOnly} onChange={(event) => setSaleOnly(event.target.checked)} type="checkbox" className="accent-[#172019]" /> On sale only</label><div className="mt-7 border-t border-[#e0e1dc] pt-5 text-xs leading-5 text-[#788078]"><p><b className="text-[#172019]">Availability:</b> In stock</p><p className="mt-2"><b className="text-[#172019]">Colors:</b> Select available finishes on product pages.</p></div></aside>
      <section><div className="mb-7 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-[#687168]">{list.length} {list.length === 1 ? "piece" : "pieces"}, selected for you</p><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-[#dedfd9] bg-white px-3 py-2 text-sm"><option>Featured</option><option>Newest</option><option>Best Rated</option><option>Most Popular</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div><div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 xl:grid-cols-4">{list.map((product) => <ProductCard key={product.id} p={product} />)}</div>{!list.length && <div className="card py-24 text-center"><p className="font-display text-2xl">No exact matches.</p><p className="mt-2 text-sm text-[#687168]">Try widening your price or category filters.</p><button onClick={reset} className="secondary-button mt-6">RESET FILTERS</button></div>}</section></div></div>;
}

function FilterTitle({ children }: { children: React.ReactNode }) { return <p className="mt-7 text-[10px] font-bold uppercase tracking-[.15em] text-[#778077]">{children}</p>; }
