'use client'

import StoreProvider from '@/lib/store/StoreProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <StoreProvider>{children}</StoreProvider>
}
