"use client";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(false);
    const form = event.currentTarget;
    const value = (name: string) => form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)?.value.trim() ?? "";
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: value("firstName") || "New subscriber", email: value("email"), phone: value("phone"), business: value("business"), challenge: "Consultation request", budget: "Not specified", goal: [value("website"), value("message")].filter(Boolean).join("\\n") || "No additional details provided", _honey: value("confirm_email_address") }) });
      if (!response.ok) throw new Error("Submission failed");
      window.location.href = "/thank-you";
    } catch { setError(true); setBusy(false); }
  }
  return <div><form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
    <label className="text-sm font-medium">First name<input required maxLength={255} name="firstName" autoComplete="given-name" className="field mt-2" /></label>
    <label className="text-sm font-medium">Email address<input required maxLength={255} type="email" name="email" autoComplete="email" className="field mt-2" /></label>
    <label className="text-sm font-medium">WhatsApp number<input required maxLength={255} type="tel" name="phone" autoComplete="tel" className="field mt-2" /></label>
    <label className="text-sm font-medium">Business name<input required maxLength={255} name="business" autoComplete="organization" className="field mt-2" /></label>
    <label className="text-sm font-medium sm:col-span-2">Website or Facebook link<input maxLength={255} type="text" name="website" autoComplete="url" className="field mt-2" placeholder="https://" /></label>
    <label className="text-sm font-medium sm:col-span-2">What would a good result look like?<textarea required maxLength={255} rows={5} name="message" className="field mt-2" placeholder="Tell me what you want to improve in the next 90 days." /></label>
    <input type="text" maxLength={255} name="confirm_email_address" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <button type="submit" disabled={busy} className="primary-button sm:col-span-2 disabled:opacity-60">{busy ? "SENDING…" : "GET MY FREE CUSTOMIZED PLAN"}</button>
    <p className="text-center text-xs text-[#718071] sm:col-span-2">By submitting, you agree to receive consultation details and related emails from AI Manjeet. You can unsubscribe at any time.</p>
  </form>{error && <div className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><p>Your details could not be submitted. Please try again.</p></div>}</div>;
}
