import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FACULTEE | Studio de Personnalisation Textile Premium",
  description: "Devis en ligne immédiat pour T-shirts bio, Hoodies et Tote-bags. Experts en Sérigraphie, Broderie et Impression numérique à Paris. Qualité premium, livraison offerte.",
  keywords: ["personnalisation textile", "sérigraphie", "broderie", "t-shirt personnalisé", "vêtement image", "facultee"],
  authors: [{ name: "FACULTEE" }],
  openGraph: {
    title: "FACULTEE | Studio de Personnalisation Textile Premium",
    description: "Calculez votre devis en temps réel pour vos textiles personnalisés.",
    url: "https://www.facultee.fr",
    siteName: "FACULTEE",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}