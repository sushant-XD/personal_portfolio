import type { Metadata } from 'next';
import { JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
});

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
});

export const metadata: Metadata = {
  title: 'Sushant Dhakal - Embedded Systems Engineer',
  description: 'Portfolio of Sushant Dhakal, Embedded Systems Engineer specializing in IoT, hardware design, and interactive installations.',
  keywords: ['Embedded Systems', 'IoT', 'Hardware Design', 'Firmware', 'Experience Design'],
  authors: [{ name: 'Sushant Dhakal' }],
  openGraph: {
    title: 'Sushant Dhakal - Portfolio',
    description: 'Embedded Systems Engineer & Experience Designer',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} ${pressStart2P.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}