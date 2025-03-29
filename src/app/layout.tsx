import type { Metadata } from "next";
import { GeistSans } from 'geist/font';
import "./globals.css";

export const metadata: Metadata = {
  title: "Glyph - A simple right click component for your logo",
  description: "A simple way to give people your logo, in one click.",
  keywords: ["logo", "brand", "component", "react", "nextjs", "ui", "ux", "design"],
  authors: [{ name: "Yash Bhardwaj" }],
  creator: "Yash Bhardwaj",
  publisher: "Yash Bhardwaj",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glyph.yashbhardwaj.com",
    siteName: "Glyph",
    title: "Glyph - A simple right click component for your logo",
    description: "A simple way to give people your logo, in one click.",
    images: [
      {
        url: "https://glyph.yashbhardwaj.com/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Glyph - A simple right click component for your logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glyph - A simple right click component for your logo",
    description: "A simple way to give people your logo, in one click.",
    images: ["https://glyph.yashbhardwaj.com/opengraph.png"],
    creator: "@ybhrdwj",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // You'll need to replace this with your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} antialiased`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
