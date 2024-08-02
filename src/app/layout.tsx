import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flight Faraz Mehraien',
  description: 'Flight by Faraz Mehraien'
}

const iransans = localFont({
  src: '../../public/fonts/fonts.woff2',
  display: 'swap',
  variable: '--font-iransans'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html dir='rtl' lang='en' className={iransans.className}>
      <body>{children}</body>
    </html>
  )
}
