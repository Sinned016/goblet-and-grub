import type { Metadata } from "next";
import { Quicksand, Amatic_SC } from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import HomeNav from "@/components/HomeNav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const amaticSC = Amatic_SC({
  variable: "--font-amatic-sc",
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
    <html lang="en" className={`${amaticSC.variable} ${quicksand.variable}`}>
      <body className={`${quicksand.className}`}>
        <div className="bg-homepage bg-cover bg-center bg-fixed min-h-screen p-4">
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <HomeNav />
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </div>
      </body>
    </html>
  );
}
