import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Book an AI marketing consultation with Shirish Rumba." };

export default function Contact() {
  const contactDetails = [[Mail, "Email", "jeetmaanrumba@gmail.com"], [Phone, "Phone", "9745727478"], [MapPin, "Location", "Bhandarkharka, Kathmandu, Nepal"]] as const;
  return <section className="mesh"><div className="section grid gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28"><div><span className="eyebrow">Let’s talk growth</span><h1 className="heading mt-5 text-5xl leading-[.98] sm:text-6xl">A smart next step starts with a good conversation.</h1><p className="mt-6 max-w-md leading-8 text-gray-300">Tell me what you’re building, fixing, or trying to unlock. I’ll come prepared with useful questions and an honest perspective.</p><div className="mt-10 space-y-5">{contactDetails.map(([Icon, label, value]) => <div className="flex gap-4" key={label}><Icon className="h-5 text-blue-300"/><div><p className="text-xs uppercase tracking-wider text-gray-500">{label}</p><p className="mt-1 text-sm text-gray-200">{value}</p></div></div>)}</div><div className="mt-10 h-40 rounded-2xl border border-white/10 bg-[linear-gradient(45deg,rgba(59,130,246,.12),transparent)] p-5 text-sm text-gray-400">Kathmandu, Nepal<br/><span className="text-blue-300">Map available on request</span></div></div><div className="glass rounded-3xl p-6 sm:p-9"><h2 className="font-display text-2xl">Tell me about your goals</h2><p className="mt-2 text-sm text-gray-400">Usually replies within one working day.</p><div className="mt-8"><ContactForm/></div></div></div></section>;
}
