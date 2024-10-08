import { cn } from '@/lib/utils'

type Props = {
    children?: React.ReactNode
    className?: string
}

export const Container = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                'rounded-md bg-secondary p-4 opacity-100 animate-in fade-in-0 md:p-6',
                className
            )}>
            {children}
        </div>
    )
}
