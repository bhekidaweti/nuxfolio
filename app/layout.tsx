import './globals.css';
import {Providers} from './providers'

export const metadata = {
  title: 'Bheki Daweti - Full Stack Developer',
  description: 'Full Stack Developer Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body >
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
