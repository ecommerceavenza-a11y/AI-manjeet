import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().min(6), company: z.string().optional(), service: z.string().min(1), budget: z.string().min(1), message: z.string().min(10) });

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    if (process.env.SMTP_HOST) {
      const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: false, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
      await transport.sendMail({ from: process.env.SMTP_USER, to: process.env.CONTACT_EMAIL || "jeetmaanrumba@gmail.com", replyTo: data.email, subject: `New Avenza enquiry — ${data.name}`, text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company || "—"}\nService: ${data.service}\nBudget: ${data.budget}\n\n${data.message}` });
    }
    return NextResponse.json({ success: true, message: "Thanks—we'll be in touch soon." }, { status: 201 });
  } catch { return NextResponse.json({ success: false, message: "Please check the form and try again." }, { status: 400 }); }
}
