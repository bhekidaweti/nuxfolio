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
        <script type="text/javascript">
          var _iub = _iub || [];
          _iub.csConfiguration = {"siteId":4369685,"cookiePolicyId":76409301,"lang":"en","storage":{"useSiteId":true}};
          </script>
          <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4369685.js"></script>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js"></script>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>
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
