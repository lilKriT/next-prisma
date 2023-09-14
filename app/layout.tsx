import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "@/lib/context/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prisma in Next",
  description: "Created by lilKriT.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen flex justify-center py-8">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
