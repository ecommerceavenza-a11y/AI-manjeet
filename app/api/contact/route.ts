import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
export const runtime = "nodejs";
const schema = z.object({
 name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(254),
 phone: z.string().trim().min(6).max(40), business: z.string().trim().min(1).max(200),
 challenge: z.string().trim().min(1).max(200), budget: z.string().trim().min(1).max(100),
 goal: z.string().trim().min(10).max(5000), marketingConsent: z.literal(true),
 _honey: z.string().max(0).optional(),
});
export async function POST(req: Request) {
 const parsed = schema.safeParse(await req.json().catch(() => null));
 if (!parsed.success) return NextResponse.json({success:false,message:"Please check your details."},{status:400});
 const flodeskKey = process.env.FLODESK_API_KEY;
 const {SMTP_HOST,SMTP_USER,SMTP_PASS} = process.env;
 if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return NextResponse.json({success:false,message:"Email delivery is temporarily unavailable."},{status:503});
 const port=Number(process.env.SMTP_PORT || 465);
 const transport=nodemailer.createTransport({host:SMTP_HOST,port,secure:port===465,requireTLS:port!==465,auth:{user:SMTP_USER,pass:SMTP_PASS},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000});
 const data=parsed.data;
 try {
  const result=await transport.sendMail({from:SMTP_USER,to:process.env.CONTACT_EMAIL || "rumbamanjit886@gmail.com",replyTo:data.email,subject:"New AI Manjeet consultation request",text:`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nBusiness: ${data.business}\nChallenge: ${data.challenge}\nBudget: ${data.budget}\n\nDesired result: ${data.goal}`});
  if (!result.accepted?.length) throw new Error("Recipient not accepted");
 } catch (error) {
  const failure = error as { code?: string; responseCode?: number }; console.error("Contact email delivery failed", { code: failure.code, responseCode: failure.responseCode });
  return NextResponse.json({success:false,message:"Email delivery is temporarily unavailable."},{status:502});
 } finally { transport.close(); }

 if (!flodeskKey) {
  console.error("Flodesk subscriber sync is not configured");
  return NextResponse.json({success:false,message:"Your consultation request was emailed, but we could not add you to the email audience. Please contact us directly to complete signup."},{status:503});
 }

 try {
  const [firstName, ...lastNameParts] = data.name.split(/\s+/);
  const subscriberResponse = await fetch("https://api.flodesk.com/v1/subscribers", {
   method: "POST",
   headers: {
    Authorization: `Basic ${Buffer.from(`${flodeskKey}:`).toString("base64")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Grow With Manjeet (https://growwithmanjit.com)",
   },
   body: JSON.stringify({
    email: data.email,
    first_name: firstName,
    last_name: lastNameParts.join(" "),
    double_optin: true,
    ...(process.env.FLODESK_SEGMENT_ID ? { segment_ids: [process.env.FLODESK_SEGMENT_ID] } : {}),
   }),
   signal: AbortSignal.timeout(12000),
  });
  if (!subscriberResponse.ok) {
   console.error("Flodesk subscriber sync failed", { status: subscriberResponse.status });
   return NextResponse.json({success:false,message:"Your consultation request was emailed, but we could not add you to the email audience. Please contact us directly to complete signup."},{status:502});
  }
  return NextResponse.json({success:true},{status:201});
 } catch (error) {
  const failure = error as { name?: string };
  console.error("Flodesk subscriber sync failed", { type: failure.name || "unknown" });
  return NextResponse.json({success:false,message:"Your consultation request was emailed, but we could not add you to the email audience. Please contact us directly to complete signup."},{status:502});
 }
}
