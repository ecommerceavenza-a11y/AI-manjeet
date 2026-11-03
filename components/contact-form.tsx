"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const formId = "6ae481726e4a3ea820397e1b";
const rootSelector = `.ff-${formId}`;
const formAction = `https://form.flodesk.com/forms/${formId}/submit`;
const formConfig = "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vd3d3Lmdyb3d3aXRobWFuaml0LmNvbS90aGFuay15b3UifSwiY29pIjp0cnVlLCJzaG93Rm9yUmV0dXJuVmlzaXRvcnMiOnRydWUsIm5vdGlmaWNhdGlvbiI6dHJ1ZSwiZ2RwciI6eyJhY2NlcHRzTWFya2V0aW5nIjpmYWxzZSwicHJpdmFjeVBvbGljeSI6eyJlbmFibGVkIjpmYWxzZSwibWFuZGF0b3J5IjpmYWxzZX19LCJ0cmFja2luZ2NvbmZpZyI6eyJtZXRhUGl4ZWxJZCI6IiIsImNvb2tpZUJhbm5lckVuYWJsZWRlIjpmYWxzZSwiZ29vZ2xlQW5hbHl0aWNzSWQiOiIifX0==";

type FlodeskFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: FlodeskFunction;
  }
}

export function ContactForm() {
  useEffect(() => {
    window.FlodeskObject = "fd";

    if (!window.fd) {
      const queue = ((...args: unknown[]) => {
        queue.q = queue.q || [];
        queue.q.push(args);
      }) as FlodeskFunction;
      window.fd = queue;
    }

    const version = `?v=${Math.floor(Date.now() / 120000) * 60}`;
    const addScript = (id: string, source: string, module: boolean) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id;
      script.async = true;
      script.src = `${source}${version}`;
      if (module) script.type = "module";
      else script.noModule = true;
      document.head.appendChild(script);
    };

    addScript("flodesk-universal-module", "https://assets.flodesk.com/universal.mjs", true);
    addScript("flodesk-universal-legacy", "https://assets.flodesk.com/universal.js", false);
    window.fd("form:handle", { formId, rootEl: rootSelector });
  }, []);

  function notifyOwner(event: React.FormEvent<HTMLFormElement>) {
    const fields = new FormData(event.currentTarget);
    void fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name: fields.get("firstName"),
        email: fields.get("email"),
        phone: fields.get("fields.whatsappMumber"),
        business: fields.get("fields.businessName"),
        challenge: "Consultation request",
        budget: "Not specified",
        goal: fields.get("fields.anythingYouWantToSay"),
        marketingConsent: fields.get("marketingConsent") === "true",
        _honey: fields.get("confirm_email_address"),
      }),
    }).catch(() => {});
  }

  return <div className={`flodesk-root ff-${formId}`} data-ff-el="root" data-ff-version="3" data-ff-type="inline" data-ff-name="ribbonBanner" data-ff-stage="default">
    <div data-ff-el="config" data-ff-config={formConfig} hidden />
    <form action={formAction} method="post" data-ff-el="form" onSubmitCapture={notifyOwner}>
      <div className="flodesk-content grid gap-5 sm:grid-cols-2" data-ff-el="content">
        <div className="contents" data-ff-el="fields">
          <label className="text-sm font-medium">First name<input required minLength={2} maxLength={255} name="firstName" autoComplete="given-name" className="field mt-2" /></label>
          <label className="text-sm font-medium">Email address<input required maxLength={255} type="email" name="email" autoComplete="email" className="field mt-2" /></label>
          <label className="text-sm font-medium">WhatsApp number<input required minLength={6} maxLength={255} type="tel" name="fields.whatsappMumber" autoComplete="tel" className="field mt-2" /></label>
          <label className="text-sm font-medium">Business name<input required maxLength={255} name="fields.businessName" autoComplete="organization" className="field mt-2" /></label>
          <label className="text-sm font-medium sm:col-span-2">Website or Facebook link<input maxLength={255} type="url" name="fields.websiteOrFacebookLink" autoComplete="url" className="field mt-2" placeholder="https://" /></label>
          <label className="text-sm font-medium sm:col-span-2">What would a good result look like?<textarea required minLength={10} maxLength={255} rows={5} name="fields.anythingYouWantToSay" className="field mt-2" placeholder="Tell me what you want to improve in the next 90 days." /></label>
          <input type="text" maxLength={255} name="confirm_email_address" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        </div>
        <label className="flex items-start gap-3 text-sm leading-6 text-[#5f695f] sm:col-span-2"><input required type="checkbox" name="marketingConsent" value="true" className="mt-1 h-4 w-4 accent-[#172019]" /><span>I agree to receive emails from AI Manjeet about my consultation and occasional marketing updates. I can unsubscribe at any time.</span></label>
        <button type="submit" data-ff-el="submit" className="primary-button sm:col-span-2">GET MY FREE CUSTOMIZED PLAN</button>
        <p className="text-center text-xs text-[#718071] sm:col-span-2">By submitting, you agree to receive the consultation details and related emails from AI Manjeet. You can unsubscribe at any time.</p>
      </div>

      <div className="flodesk-success min-h-[460px] place-items-center text-center" data-ff-el="success" aria-live="polite"><div><CheckCircle2 className="mx-auto h-12 w-12 text-[#668267]" /><h3 className="mt-5 font-display text-3xl">You’re all set.</h3><p className="mx-auto mt-2 max-w-sm text-[#657065]">Check your inbox for the Flodesk confirmation email, then click the button inside it to activate your subscription.</p></div></div>
      <div className="flodesk-error mt-5 items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700" data-ff-el="error" role="alert"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><p>Your details could not be submitted. Please check the fields and try again.</p></div>
    </form>

    <style jsx>{`
      .flodesk-success,
      .flodesk-error { display: none; }
      .flodesk-root[data-ff-stage="success"] .flodesk-content { display: none; }
      .flodesk-root[data-ff-stage="success"] .flodesk-success { display: grid; }
      .flodesk-root[data-ff-stage="error"] .flodesk-error,
      .flodesk-root .fd-has-error .flodesk-error { display: flex; }
    `}</style>
  </div>;
}
