"use client";

import { useEffect } from "react";

const formId = "6ae481726e4a3ea820397e1b";
const containerId = `fd-form-${formId}`;

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
    for (const [suffix, isModule] of [["mjs", true], ["js", false]] as const) {
      const id = `flodesk-universal-${suffix}`;
      if (document.getElementById(id)) continue;
      const script = document.createElement("script");
      script.id = id;
      script.async = true;
      if (isModule) script.type = "module";
      else script.noModule = true;
      script.src = `https://assets.flodesk.com/universal.${suffix}${version}`;
      document.head.appendChild(script);
    }

    window.fd("form", { formId, containerEl: `#${containerId}` });
  }, []);

  function notifyOwner(event: React.FormEvent<HTMLDivElement>) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    const fields = Array.from(form.querySelectorAll<HTMLInputElement>("input.fd-form-control"))
      .filter((input) => {
        const rect = input.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.x >= 0 && rect.x < window.innerWidth;
      });
    const [email, name, phone, business, website, message] = fields.map((field) => field.value.trim());
    if (!email || !email.includes("@")) return;

    void fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name: name || "New subscriber",
        email,
        phone: phone || "Not provided",
        business: business || "Not provided",
        challenge: "Flodesk consultation request",
        budget: "Not specified",
        goal: [website && `Website: ${website}`, message || "No additional details provided"].filter(Boolean).join("\n"),
        _honey: "",
      }),
    }).catch(() => {});
  }

  return <div onSubmitCapture={notifyOwner}>
    <div id={containerId} />
  </div>;
}
