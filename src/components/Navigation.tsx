'use client'

import { SidebarToggle } from '@/components/Sidebar/SidebarToggle'
import { uiSlice } from '@/lib/store/features/ui/uiSlice'
import { useAppSelector } from '@/lib/store/hooks'
import { cn } from '@/lib/utils'

export const Navigation = () => {
    const sidebarIsOpen = useAppSelector(uiSlice.selectors.sidebarIsOpen)

    return (
        <div
            className={cn(
                'sticky top-0 z-40 h-navbar w-full border-b bg-secondary/80 backdrop-blur-sm sm:bg-secondary/80',
                { ['bg-secondary/100']: sidebarIsOpen }
            )}>
            <div className='mx-auto flex h-full max-w-screen-xl items-center px-2'>
                <SidebarToggle />
            </div>
        </div>
    )
}
