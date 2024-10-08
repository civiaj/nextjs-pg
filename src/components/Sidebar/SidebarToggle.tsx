'use client'

import { Button } from '@/components/ui/button'
import { uiSlice } from '@/lib/store/features/ui/uiSlice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { cn } from '@/lib/utils'
import { OpenSidebarIcon } from '@/shared/icons'

export const SidebarToggle = () => {
    const dispatch = useAppDispatch()
    const sidebarIsOpen = useAppSelector(uiSlice.selectors.sidebarIsOpen)

    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => dispatch(uiSlice.actions.toggleSidebar())}>
            <OpenSidebarIcon className={cn('transition-all', { ['rotate-180']: sidebarIsOpen })} />
        </Button>
    )
}
