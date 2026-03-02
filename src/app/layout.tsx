import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FACULTEE | Studio de Personnalisation Textile Premium",
  description: "Devis en ligne immédiat pour T-shirts bio, Hoodies et Tote-bags. Experts en Sérigraphie, Broderie et Impression numérique à Paris. Qualité premium, livraison offerte.",
  keywords: ["personnalisation textile", "sérigraphie", "broderie", "t-shirt personnalisé", "facultee"],
  // AJOUT DU FAVICON ICI
  icons: {
    icon: "/favicon.ico",
  },
  // TON CODE DE VERIFICATION GOOGLE ICI :
  verification: {
    google: "cGIBDY-t-1as5S1yhO8HmVKxWGLBzBuIZpPecy6Vud4",
  },
  openGraph: {
    title: "FACULTEE | Studio de Personnalisation Textile Premium",
    description: "Calculez votre devis en temps réel pour vos textiles personnalisés.",
    url: "https://www.facultee.fr",
    siteName: "FACULTEE",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Sécurité supplémentaire pour Google */}
        <meta name="google-site-verification" content="cGIBDY-t-1as5S1yhO8HmVKxWGLBzBuIZpPecy6Vud4" />
      </head>
      <body>{children}</body>
    </html>
  );
}