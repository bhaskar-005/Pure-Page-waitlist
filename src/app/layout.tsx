import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chronist - AI-Powered Journaling",
  description: "Experience the future of journaling with AI-powered insights, voice recording, and intelligent prompts that help you reflect deeper.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E79FYXFSJY" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E79FYXFSJY', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${workSans.variable} antialiased`}
      >
        <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
        {children}
      </body>
    </html>
  );
}
