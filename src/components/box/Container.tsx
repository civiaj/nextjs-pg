import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    children?: React.ReactNode
    className?: string
    withoutAnimation?: boolean
}

export const Container = forwardRef<HTMLDivElement, Props>(
    ({ children, className, withoutAnimation }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-md bg-secondary p-4 md:p-6',
                    { ['animate-in fade-in-0']: !withoutAnimation },
                    className
                )}>
                {children}
            </div>
        )
    }
)

Container.displayName = 'Container'
