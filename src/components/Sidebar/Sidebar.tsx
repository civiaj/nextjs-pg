'use client'

import { useRef, useState, useEffect } from 'react'
import { LucideProps } from 'lucide-react'
import { NavLink } from '@/components/NavLInk'
import { Overlay } from '@/components/Overlay'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { uiSlice } from '@/lib/store/features/ui/uiSlice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { cn } from '@/lib/utils'
import { IconHouse, IconUser } from '@/shared/icons'
import { TPath } from '@/types/common.types'

type SidebarItem = {
    path: TPath
    label: string
    Icon: React.ComponentType<LucideProps>
}

const sidebarItems: SidebarItem[] = [
    { label: 'Главная', path: '/', Icon: IconHouse },
    { label: 'Пользователь', path: '/user', Icon: IconUser }
]
const initialSidebarWidth = 200

export const Sidebar = () => {
    const sidebarIsOpen = useAppSelector(uiSlice.selectors.sidebarIsOpen)
    const sidebarRef = useRef<HTMLDivElement | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [width, setWidth] = useState(initialSidebarWidth)
    const [position, setPosition] = useState({ start: 0, end: 0 })
    const dispatch = useAppDispatch()

    useEffect(() => {
        const getClientX = (e: MouseEvent | TouchEvent) =>
            e instanceof MouseEvent ? e.clientX : e.touches[0].clientX

        const handleDown = (e: MouseEvent | TouchEvent) => {
            if (!sidebarRef.current || !sidebarRef.current.contains(e.target as Node)) return
            setIsDragging(true)
            setWidth(sidebarIsOpen ? initialSidebarWidth : 0)
            setPosition((p) => ({ ...p, start: getClientX(e) }))
        }

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return
            const end = getClientX(e)
            setPosition((p) => ({ ...p, end }))
            const newWidth = Math.min(
                Math.max(0, initialSidebarWidth - (position.start - end)),
                initialSidebarWidth
            )
            setWidth(newWidth)
            if (newWidth < initialSidebarWidth / 2) {
                setIsDragging(false)
                dispatch(uiSlice.actions.toggleSidebar(false))
            }
        }

        const handleUp = () => {
            if (!isDragging) return
            setIsDragging(false)
            setPosition({ start: 0, end: 0 })
        }

        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleUp)
        document.addEventListener('mousedown', handleDown)

        document.addEventListener('touchmove', handleMove)
        document.addEventListener('touchend', handleUp)
        document.addEventListener('touchstart', handleDown)

        return () => {
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleUp)
            document.removeEventListener('mousedown', handleDown)

            document.removeEventListener('touchmove', handleMove)
            document.removeEventListener('touchend', handleUp)
            document.removeEventListener('touchstart', handleDown)
        }
    }, [isDragging, dispatch, position, sidebarIsOpen])

    return (
        <>
            <div className='fixed top-[var(--navbar-height)] z-40 h-[calc(100dvh-var(--navbar-height))] bg-secondary sm:sticky sm:bg-transparent sm:backdrop-blur-0'>
                <div
                    className={cn(
                        'h-full w-full overflow-hidden sm:block',
                        sidebarIsOpen ? 'md:border-r' : 'border-r-0'
                    )}>
                    <div
                        ref={sidebarRef}
                        style={{
                            width: isDragging ? width : sidebarIsOpen ? initialSidebarWidth : 0
                        }}
                        className={cn(
                            'h-full w-full max-w-full shrink-0 flex-nowrap transition-[width]',
                            {
                                ['transition-none']: isDragging
                            }
                        )}>
                        <NavigationMenu
                            className={cn(
                                'flex max-w-full flex-col items-start justify-start gap-1 px-2 py-2 md:py-4'
                            )}>
                            {sidebarItems.map(({ Icon, label, path }) => (
                                <NavLink
                                    key={path}
                                    href={path}
                                    label={label}
                                    Icon={Icon}
                                />
                            ))}
                        </NavigationMenu>
                    </div>
                </div>
            </div>
            <Overlay
                isOpen={sidebarIsOpen}
                onClose={() => dispatch(uiSlice.actions.toggleSidebar(false))}
            />
        </>
    )
}
