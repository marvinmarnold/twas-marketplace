import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import { TwasProvider } from '@/context/twas'

export const metadata: Metadata = {
  title: 'twas',
  description: 'Twas Launched'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <TwasProvider>{children}</TwasProvider>
      </body>
    </html>
  )
}