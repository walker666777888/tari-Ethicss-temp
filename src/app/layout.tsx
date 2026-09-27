import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Public_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TARI Ethics | Whistleblower hotline and case management",
  description:
    "TARI runs your whistleblower hotline and secure reporting link, and gives your compliance team one secure place to take every whistleblower report from first call to closure.",
};

export const viewport: Viewport = {
  themeColor: "#eef1ec",
};

// Runs before first paint: marks the page as scripted so reveal styles never flash, and
// stops the browser restoring a stale scroll offset (the page height settles after hydration).
const jsFlag = `document.documentElement.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual';`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${archivo.variable} ${publicSans.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
