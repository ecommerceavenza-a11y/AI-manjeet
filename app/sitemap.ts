import type { MetadataRoute } from "next";
import { posts, services } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap { const root="https://avenzaecommerce.com"; return ["","/about","/services","/blog","/contact"].map(url=>({url:root+url,lastModified:new Date()})).concat(services.map(s=>({url:`${root}/services/${s.slug}`,lastModified:new Date()})),posts.map(p=>({url:`${root}/blog/${p.slug}`,lastModified:new Date()}))); }
