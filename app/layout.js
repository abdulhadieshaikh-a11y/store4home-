import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'store4home — Considered goods for everyday life',
  description: 'Home & living, electronics, fashion, kitchen and more — thoughtfully sourced, shipped across Pakistan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
