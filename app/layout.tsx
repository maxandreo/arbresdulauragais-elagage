import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Élagage Lauragais | Andréo Luc - Expert Certifié Toulouse, Carcassonne',
  description:
    'Professionnel élagage, abattage, taille haies. Zone: Toulouse, Carcassonne, Castres, Revel. Devis gratuit. Crédit impôt 50%. Certifié et assuré.',
  keywords: ['élagage', 'abattage', 'taille haies', 'Toulouse', 'Lauragais', 'Carcassonne'],
  openGraph: {
    title: 'Arbres du Lauragais Élagage - Expert Certifié',
    description: 'Professionnel élagage dans le Lauragais. Devis gratuit.',
    url: 'https://arbresdulauragais-elagage.fr',
    siteName: 'Arbres du Lauragais Élagage',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
