import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Foo Food Fighters',
  description: 'A Food CV/ML Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>{children}</body>
    </html>
    
  )
}
