import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';

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
      <body>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <FloatingButtons />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
