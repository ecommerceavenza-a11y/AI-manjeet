import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Consultation Request Received",
  description: "Your free marketing consultation request has been received.",
  robots: { index: false, follow: false },
};

const message = encodeURIComponent(
  "Hi, I just submitted the consultation form on your website. I’d like to discuss the next steps.",
);

export default function ThankYouPage() {
  return (
    <section className="page-hero">
      <div className="section mx-auto flex min-h-[68vh] max-w-3xl flex-col items-center justify-center py-16 text-center sm:py-24">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#e2ecdf] text-[#55705b]">
          <CheckCircle2 aria-hidden="true" className="h-9 w-9" />
        </span>
        <p className="eyebrow mt-7">Request received</p>
        <h1 className="heading mt-4 text-4xl sm:text-6xl">Thank you for reaching out.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#5f695f]">
          Your consultation request has been sent. I’ll review your details and get back to you within one working day to arrange your free consultation.
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={`https://wa.me/9779745727478?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f9d55] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#188348]"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Message me on WhatsApp
          </a>
          <Link href="/" className="secondary-button">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
