import { NextResponse } from "next/server";
import { z } from "zod";
export const runtime = "nodejs";
const schema = z.object({
 name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(254),
 phone: z.string().trim().min(6).max(40), business: z.string().trim().min(1).max(200),
 challenge: z.string().trim().min(1).max(200), budget: z.string().trim().min(1).max(100),
 goal: z.string().trim().min(10).max(5000), _honey: z.string().max(0).optional(),
});
export async function POST(req: Request) {
 const parsed = schema.safeParse(await req.json().catch(() => null));
 if (!parsed.success) return NextResponse.json({success:false,message:"Please check your details."},{status:400});
 const {BREVO_API_KEY,BREVO_LIST_ID} = process.env;
 if (!BREVO_API_KEY || !BREVO_LIST_ID) return NextResponse.json({success:false,message:"Contact list delivery is temporarily unavailable."},{status:503});
 const data=parsed.data;
 try {
  const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", { method: "POST", headers: { accept: "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY }, body: JSON.stringify({ email: data.email, listIds: [Number(BREVO_LIST_ID)], updateEnabled: true }) });
  if (!brevoResponse.ok) {
   const detail = await brevoResponse.text();
   console.error("Brevo contact rejected", brevoResponse.status, detail);
   return NextResponse.json({success:false,message:`Brevo rejected the contact (${brevoResponse.status}). ${detail.slice(0,240)}`},{status:502});
  }
  return NextResponse.json({success:true},{status:201});
 } catch (error) {
  const failure = error as { code?: string; responseCode?: number }; console.error("Contact email delivery failed", { code: failure.code, responseCode: failure.responseCode });
  return NextResponse.json({success:false,message:"Email delivery is temporarily unavailable."},{status:502});
 }
}
