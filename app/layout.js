import { Inter } from "next/font/google";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/app/globals.css";
import ClientLayout from "@/app/ClientLayout";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "IntelliHire | AI-Powered Smart Interview Platform",
  description: "Revolutionize your hiring process with IntelliHire. Our AI-driven platform helps candidates practice interviews and organizations find the perfect talent through intelligent evaluation.",
  keywords: ["AI Interview", "Smart Hiring", "Recruitment AI", "Job Interview Practice", "IntelliHire"],
  authors: [{ name: "IntelliHire Team" }],
  openGraph: {
    title: "IntelliHire | AI-Powered Smart Interview Platform",
    description: "Intelligent hiring and interview practice platform powered by AI.",
    url: "https://intelli-hire-cyan.vercel.app/intelliHire",
    siteName: "IntelliHire",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliHire | AI-Powered Smart Interview Platform",
    description: "Revolutionize your hiring process with AI-driven evaluations.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
