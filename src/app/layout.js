import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OptiMedia Hub',
  description: 'OptiMedia Hub: Optimize and transform your images and videos for perfect social media formats with ease.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dark">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
