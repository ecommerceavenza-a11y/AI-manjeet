"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

const formEndpoint = "/api/contact";

type FormStatus = "idle" | "sending" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailDraftUrl, setEmailDraftUrl] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    const details = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone}`,
      `Business type: ${fields.business}`,
      `Main marketing challenge: ${fields.challenge}`,
      `Monthly marketing budget: ${fields.budget}`,
      `Desired result: ${fields.goal}`,
      `Email audience consent: ${fields.marketingConsent === "true" ? "Yes" : "No"}`,
    ].join("\n");
    setEmailDraftUrl(`mailto:rumbamanjit886@gmail.com?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(details)}`);
    setWhatsAppUrl(`https://wa.me/9779745727478?text=${encodeURIComponent(`I'd like a free consultation.\n\n${details}`)}`);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...fields, marketingConsent: fields.marketingConsent === "true" }),
      });

      const result = await response.json().catch(() => ({}));
      const succeeded = result.success === true || result.success === "true";
      if (!response.ok || !succeeded) {
        throw new Error(typeof result.message === "string" ? result.message : "Submission failed");
      }

      window.location.assign("/thank-you");
      return;
    } catch (error) {
      setErrorMessage(error instanceof Error && error.message !== "Submission failed"
        ? error.message
        : "Your request could not be sent right now. Your details are still here. Open an email or WhatsApp draft below, or try again later.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return <form action="/api/contact" method="POST" onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <label className="text-sm font-medium">Your name<input required minLength={2} name="name" autoComplete="name" className="field mt-2" /></label>
    <label className="text-sm font-medium">Email address<input required type="email" name="email" autoComplete="email" className="field mt-2" /></label>
    <label className="text-sm font-medium">Phone number<input required type="tel" name="phone" minLength={6} autoComplete="tel" className="field mt-2" /></label>
    <label className="text-sm font-medium">Business type<input required name="business" autoComplete="organization" className="field mt-2" placeholder="Example: local service business" /></label>
    <label className="text-sm font-medium">Main marketing challenge<select required name="challenge" className="field mt-2"><option value="">Select one</option><option>Not enough leads</option><option>Marketing takes too much time</option><option>Content is inconsistent</option><option>Ads are not converting</option><option>Follow-up is too slow</option><option>I am not sure where to start</option></select></label>
    <label className="text-sm font-medium">Monthly marketing budget<select required name="budget" className="field mt-2"><option value="">Select a range</option><option>Under $500</option><option>$500–$1,500</option><option>$1,500–$5,000</option><option>$5,000+</option><option>Not decided yet</option></select></label>
    <label className="text-sm font-medium sm:col-span-2">What would a good result look like?<textarea required minLength={10} rows={5} name="goal" className="field mt-2" placeholder="Tell me what you want to improve in the next 90 days." /></label>
    <label className="flex items-start gap-3 text-sm leading-6 text-[#5f695f] sm:col-span-2"><input required type="checkbox" name="marketingConsent" value="true" className="mt-1 h-4 w-4 accent-[#172019]" /><span>I agree to receive emails from AI Manjeet about my consultation and occasional marketing updates. I can unsubscribe at any time.</span></label>
    {status === "error" && <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 sm:col-span-2" role="alert"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><div><p>{errorMessage}</p><div className="mt-3 flex flex-wrap gap-4"><a className="font-semibold underline" href={emailDraftUrl}>Open email draft</a><a className="font-semibold underline" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp draft</a></div></div></div>}
    <button disabled={status === "sending"} className="primary-button sm:col-span-2">{status === "sending" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{status === "sending" ? "SENDING…" : "GET MY FREE CUSTOMIZED PLAN"}</button>
    <p className="text-center text-xs text-[#718071] sm:col-span-2">After submitting, check your inbox for a Flodesk confirmation email to finish joining the audience.</p>
  </form>;
}
