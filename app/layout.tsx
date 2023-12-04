import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'SwapBySwap',
  description: 'A platform for swapping things',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <div className="page">
          <Navbar />
          <main className='main'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
