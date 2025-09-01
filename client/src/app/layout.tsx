import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../api/react-query";
import Sidebar from "../components/sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketAI",
  description: "Creating solutions to improve user experience when buying groceries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-auto lg:ml-0">
              <div className="lg:pl-0 pl-0">{children}</div>
            </main>
          </div>
          <Toaster richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
