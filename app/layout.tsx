import './globals.css';

export const metadata = {
  title: 'Bheki Daweti - Full Stack Developer',
  description: 'Full Stack Developer Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <header className="p-4">
  
        </header>
        {children}
      </body>
    </html>
  );
}
