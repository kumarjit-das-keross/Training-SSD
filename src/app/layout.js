import "./globals.css";

export const metadata = {
  title: 'Training SSD',
  description: 'Copy of MTN project from ikoncloud-dev',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='h-dvh'>
      {children}
      </body>
    </html>
  );
}
