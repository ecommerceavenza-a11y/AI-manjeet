"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget"),
  message: z.string().min(10, "Tell me a little more (10 characters minimum)"),
});

type Form = z.infer<typeof schema>;
const formSubmitUrl = "https://formsubmit.co/ajax/jeetmaanrumba@gmail.com";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const submit = async (data: Form) => {
    setSubmitError("");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value ?? ""));
    formData.append("_subject", `New Avenza enquiry from ${data.name}`);
    formData.append("_template", "table");
    formData.append("_honey", "");

    try {
      const res = await fetch(formSubmitUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) throw new Error("FormSubmit rejected the request");
      setSent(true);
      reset();
    } catch {
      setSubmitError("Your message could not be sent. Please try again or email jeetmaanrumba@gmail.com.");
    }
  };

  if (sent) return <div className="grid min-h-[430px] place-items-center text-center"><div><CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400"/><h3 className="mt-5 font-display text-2xl">Message received.</h3><p className="mt-2 text-gray-400">Thanks for reaching out. Shirish will be in touch soon.</p></div></div>;

  const field = "mt-1.5 w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-400";
  return <form onSubmit={handleSubmit(submit)} className="grid gap-5 sm:grid-cols-2">
    {[['name', 'Your name'], ['email', 'Email address'], ['phone', 'Phone number'], ['company', 'Company (optional)']].map(([name, label]) => <label className="text-sm" key={name}>{label}<input className={field} {...register(name as keyof Form)}/>{errors[name as keyof Form] && <span className="mt-1 block text-xs text-red-300">{errors[name as keyof Form]?.message}</span>}</label>)}
    <label className="text-sm">Service required<select className={field} {...register("service")}><option value="">Select a service</option><option>AI Marketing Strategy</option><option>AI Automation</option><option>SEO & Content</option><option>Lead Generation</option><option>Other</option></select>{errors.service && <span className="mt-1 block text-xs text-red-300">{errors.service.message}</span>}</label>
    <label className="text-sm">Approx. budget<select className={field} {...register("budget")}><option value="">Select a range</option><option>Under $1,000</option><option>$1,000 – $3,000</option><option>$3,000 – $8,000</option><option>$8,000+</option></select>{errors.budget && <span className="mt-1 block text-xs text-red-300">{errors.budget.message}</span>}</label>
    <label className="text-sm sm:col-span-2">What are you hoping to achieve?<textarea rows={5} className={field} {...register("message")}/>{errors.message && <span className="mt-1 block text-xs text-red-300">{errors.message.message}</span>}</label>
    {submitError && <p className="text-sm text-red-300 sm:col-span-2" role="alert">{submitError}</p>}
    <button disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold disabled:opacity-60 sm:col-span-2">{isSubmitting && <Loader2 className="h-4 animate-spin"/>}{isSubmitting ? "Sending..." : "Send enquiry"}</button>
  </form>;
}
