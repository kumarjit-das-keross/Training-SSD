import "./globals.css";
import StripNavigation from '@/app/components/StripNavigation';

export const metadata = {
  title: 'MTN Dummy',
  description: 'Copy of MTN project from ikoncloud-dev',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='h-dvh'>
      <div className='h-full flex'>
        <StripNavigation>
          Navigation
        </StripNavigation>
        <main className='grow'>
          {children}
        </main>
      </div>
      </body>
    </html>
  );
}
