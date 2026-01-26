import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FACULTEE | Studio de Personnalisation Textile Premium",
  description: "Devis en ligne immédiat pour T-shirts bio, Hoodies et Tote-bags. Experts en Sérigraphie, Broderie et Impression numérique.",
  // AJOUTE CETTE LIGNE ICI :
  verification: {
    google: 'cGIBDY-t-1as5S1yhO8HmVKxWGLBzBuIZpPecy6Vud4', 
  },
  // Le reste de tes metadatas...
  openGraph: {
    title: "FACULTEE | Studio de Personnalisation Textile Premium",
    url: "https://www.facultee.fr",
    siteName: "FACULTEE",
    locale: "fr_FR",
    type: "website",
  },
};
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