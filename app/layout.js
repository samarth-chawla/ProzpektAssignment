import { Marcellus, Archivo } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Morrow Café - Claim ₹150 OFF | Sector 104, Noida",
  description:
    "Scanned in-store? Claim ₹150 OFF your next visit to Morrow Café, Sector 104 Noida. Takes 20 seconds. Show code at counter.",
  openGraph: {
    title: "Morrow Café - Get ₹150 OFF",
    description: "Claim in 20 seconds. Show code on your next visit.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${archivo.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-espresso antialiased">
        {children}
      </body>
    </html>
  );
}
