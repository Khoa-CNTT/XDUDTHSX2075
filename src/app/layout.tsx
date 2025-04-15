import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'; 
import { ThemeProvider } from 'next-themes';

 const inter = Inter({ subsets: ['latin'] });

 export const metadata: Metadata = {
  title: 'Create Next App',
 }

 export default function RootLayout({
  children,
 }: Readonly<{
  children: React.ReactNode;
 }>){
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
        attribute={"class"}
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
 }