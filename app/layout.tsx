import type { Metadata } from "next";
import { Inria_Serif } from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import HomeNav from "@/components/HomeNav";

const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Goblet & Grub",
  description: "Goblet & Grub, a page where you can find easy and good recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-serif antialiased`}>
        <div className="bg-homepage bg-cover bg-center bg-fixed min-h-screen p-4 xl:p-0 xl:pb-12">
          <HomeNav />
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </div>
      </body>
    </html>
  );
}
