import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const siteUrl = "https://chronists.com/"
const ogImage = "/og1.png";

// export const metadata: Metadata = {
//   title: "Chronist - AI-Powered Journaling",
//   description: "Experience the future of journaling with AI-powered insights, voice recording, and intelligent prompts that help you reflect deeper.",
// };


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chronist - AI-Powered Journaling",
    template: "%s | Chronist",
  },
  description:
    "Experience the future of journaling with AI-powered insights and intelligent prompts that help you reflect deeper.",
  keywords: [
    "AI journaling app",
    "AI diary",
    "mental health journaling",
    "daily reflection app",
    "Chronist",
    "Chronists",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Chronists - AI-Powered Journaling",
    siteName: "chronists",
    description:
      "Experience the future of journaling with AI-powered insights, voice recording, and intelligent prompts that help you reflect deeper.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "chronists – AI-powered journaling interface and timeline view",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "chronists - AI-Powered Journaling",
    description:
      "AI-powered journaling with insights and intelligent prompts that help you reflect deeper.",
    images: [ogImage],
    creator: "@bhaskar_builds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
