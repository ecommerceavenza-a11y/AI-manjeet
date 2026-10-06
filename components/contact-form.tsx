"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const formEndpoint = "https://formsubmit.co/ajax/rumbamanjit886@gmail.com";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...fields,
          _subject: "New AI Manjeet consultation request",
          _template: "table",
          _url: window.location.href,
        }),
      });

      const result = await response.json();
      const succeeded = result.success === true || result.success === "true";
      if (!response.ok || !succeeded) throw new Error(result.message || "Submission failed");

      form.reset();
      setStatus("sent");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed";
      setErrorMessage(message.includes("needs Activation")
        ? "This form needs one-time activation. Open the FormSubmit email sent to rumbamanjit886@gmail.com, click Activate Form, and then submit again."
        : "Your request could not be sent. Please try again, or email rumbamanjit886@gmail.com.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <div className="grid min-h-[460px] place-items-center text-center" aria-live="polite"><div><CheckCircle2 className="mx-auto h-12 w-12 text-[#668267]" /><h3 className="mt-5 font-display text-3xl">Your request has been sent.</h3><p className="mx-auto mt-2 max-w-sm text-[#657065]">Thank you. I’ll review your details and reply within one working day to arrange your free consultation.</p><button type="button" onClick={() => setStatus("idle")} className="secondary-button mt-6">Send another request</button></div></div>;
  }

  return <form action="https://formsubmit.co/rumbamanjit886@gmail.com" method="POST" onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
    <input type="hidden" name="_subject" value="New AI Manjeet consultation request" />
    <input type="hidden" name="_template" value="table" />
    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <label className="text-sm font-medium">Your name<input required minLength={2} name="name" autoComplete="name" className="field mt-2" /></label>
    <label className="text-sm font-medium">Email address<input required type="email" name="email" autoComplete="email" className="field mt-2" /></label>
    <label className="text-sm font-medium">Phone number<input required type="tel" name="phone" minLength={6} autoComplete="tel" className="field mt-2" /></label>
    <label className="text-sm font-medium">Business type<input required name="business" autoComplete="organization" className="field mt-2" placeholder="Example: local service business" /></label>
    <label className="text-sm font-medium">Main marketing challenge<select required name="challenge" className="field mt-2"><option value="">Select one</option><option>Not enough leads</option><option>Marketing takes too much time</option><option>Content is inconsistent</option><option>Ads are not converting</option><option>Follow-up is too slow</option><option>I am not sure where to start</option></select></label>
    <label className="text-sm font-medium">Monthly marketing budget<select required name="budget" className="field mt-2"><option value="">Select a range</option><option>Under $500</option><option>$500–$1,500</option><option>$1,500–$5,000</option><option>$5,000+</option><option>Not decided yet</option></select></label>
    <label className="text-sm font-medium sm:col-span-2">What would a good result look like?<textarea required minLength={10} rows={5} name="goal" className="field mt-2" placeholder="Tell me what you want to improve in the next 90 days." /></label>
    {status === "error" && <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 sm:col-span-2" role="alert"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><p>{errorMessage} <a className="font-semibold underline" href="mailto:rumbamanjit886@gmail.com">Email directly</a>.</p></div>}
    <button disabled={status === "sending"} className="primary-button sm:col-span-2">{status === "sending" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{status === "sending" ? "SENDING…" : "GET MY FREE CUSTOMIZED PLAN"}</button>
    <p className="text-center text-xs text-[#718071] sm:col-span-2">Your information stays private and is only used to prepare for the consultation.</p>
  </form>;
}
