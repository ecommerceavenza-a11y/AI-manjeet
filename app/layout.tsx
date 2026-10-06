import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StoreProvider } from "@/components/store";

export const metadata: Metadata = {
  metadataBase: new URL("https://avenzaecommerce.com"),
  title: {
    default: "AI Manjeet | AI-Powered Digital Marketing",
    template: "%s | AI Manjeet",
  },
  description: "AI-powered digital marketing for small and medium businesses that want more leads, less manual work, and a clear plan they can act on.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Manjeet",
    title: "AI Manjeet | AI-Powered Digital Marketing",
    description: "Turn scattered marketing into a clear, repeatable growth system.",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body className="font-sans antialiased"><StoreProvider><Navbar /><main>{children}</main><Footer /></StoreProvider></body></html>;
}
