import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RateShield - Decode Your Con Edison Bill",
  description:
    "Understand why your electricity bill is high and what you can do about it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <nav className="border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-blue-900">
            RateShield
          </a>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="/bill/enter" className="hover:text-gray-900">Decode Bill</a>
            <a href="/history" className="hover:text-gray-900">History</a>
            <a href="/legislation" className="hover:text-gray-900">Legislation</a>
            <a href="/assistance" className="hover:text-gray-900">Assistance</a>
          </div>
        </nav>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-gray-200 px-8 py-4 text-center text-sm text-gray-400">
          RateShield · NYC Energy Cost Transparency · All data from public sources (NYISO, NY PSC)
        </footer>
      </body>
    </html>
  );
}