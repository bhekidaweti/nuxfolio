import './globals.css';
import {Providers} from './providers'
import Header from '../components/Header';
import Script from "next/script";

export const metadata = {
  title: 'Bheki Daweti - Full Stack Developer',
  description: 'Full Stack Developer Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <header>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K1BSS4M7ZV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K1BSS4M7ZV');
          `}
        </Script>
      </header>
      <body >
      <Header />
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
