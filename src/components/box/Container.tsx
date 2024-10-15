import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    children?: React.ReactNode
    className?: string
}

export const Container = forwardRef<HTMLDivElement, Props>(({ children, className }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('rounded-md bg-secondary p-4 animate-in fade-in-0 md:p-6', className)}>
            {children}
        </div>
    )
})

Container.displayName = 'Container'
