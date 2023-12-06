import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './styles/globals.css'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Providers from '../components/providers';

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
          <Providers>
            <Navbar />
            <main className='main'>{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
