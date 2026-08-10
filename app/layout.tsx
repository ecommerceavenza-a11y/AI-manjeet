import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
export const metadata: Metadata = { metadataBase: new URL("https://avenzaecommerce.com"), title: { default: "Avenza E-commerce | AI Marketing Expert", template: "%s | Avenza E-commerce" }, description: "Shirish Rumba helps ambitious businesses grow faster through AI-powered marketing systems.", openGraph: { type: "website", locale: "en_US", siteName: "Avenza E-commerce" }, twitter: { card: "summary_large_image" }, alternates: { canonical: "/" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="font-sans antialiased"><Navbar /><main>{children}</main><Footer /></body></html>; }
