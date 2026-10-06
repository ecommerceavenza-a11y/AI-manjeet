import type { MetadataRoute } from "next";
import { posts, services } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap { const root="https://avenzaecommerce.com"; const pages=["","/about","/services","/blog","/contact","/faq","/privacy","/terms"]; return pages.map(url=>({url:root+url,lastModified:new Date()})).concat(services.map(s=>({url:`${root}/services/${s.slug}`,lastModified:new Date()})),posts.map(p=>({url:`${root}/blog/${p.slug}`,lastModified:new Date()}))); }
