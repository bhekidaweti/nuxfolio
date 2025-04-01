import './globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Bheki Daweti - Web Developer',
  description: 'Full Stack Developer Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
