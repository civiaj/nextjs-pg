import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Providers } from '@/app/providers'
import { Navigation } from '@/components/Navigation'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import './globals.css'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
})

export const metadata: Metadata = {
    title: 'nextjs-pg - Главная',
    description: 'Учебный проект с использованием Next.js и PostgreSQL.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='ru'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background font-geist-sans text-primary antialiased`}>
                <Providers>
                    <div className='flex h-full min-h-screen flex-col'>
                        <Navigation />
                        <div className='mx-auto grid w-full max-w-screen-xl flex-1 grid-cols-1 sm:grid-cols-[auto_1fr]'>
                            <Sidebar />
                            <div className='mx-auto w-full max-w-3xl md:px-2 md:pt-4'>
                                {children}
                            </div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
