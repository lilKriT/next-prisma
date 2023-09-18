import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "@/lib/context/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get it Done!",
  description: "A task list Created by lilKriT using Next.js and Prisma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen flex justify-center py-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
