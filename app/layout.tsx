import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Providers from '../components/providers';
import Container from '../components/layout/container';

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
        <div className="flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <main>
              <Container className='py-8'>
                {children}
              </Container>
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
