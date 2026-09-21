import type { Metadata } from "next";
import { Unbounded, Fraunces, Space_Mono } from "next/font/google";
import { N8nChat } from "@/components/chat/N8nChat";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  weight: ["700", "900"],
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Café Inc. — Café especial em Moema, São Paulo",
  description:
    "Cafés especiais e artesanais de origem sustentável, em um ambiente acolhedor e socialmente tolerante. Cardápio com opções gostosas e saudáveis, sessões de degustação e reservas de mesa em Moema, São Paulo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${unbounded.variable} ${fraunces.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <N8nChat />
      </body>
    </html>
  );
}
