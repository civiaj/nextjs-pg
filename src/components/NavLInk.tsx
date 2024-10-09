'use client'

import { LucideProps } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
    children?: React.ReactNode
    label?: string
    Icon?: React.ComponentType<LucideProps>
    className?: string | ((isActive: boolean) => string)
} & LinkProps

const checkProps = ({ children, label }: Props) => {
    if ([children, label].every((v) => v === undefined))
        throw new Error('Provide at least children or label')
}

const getAdditionalClass = (
    isActive: boolean,
    className?: string | ((isActive: boolean) => string)
) => {
    if (typeof className === 'string') return className
    else if (typeof className === 'function') return className(isActive)
    return ''
}

export const NavLink = (props: Props) => {
    checkProps(props)
    const { children, label, Icon, className, ...rest } = props
    const { href } = rest
    const pathname = usePathname()
    const isActive = pathname === href

    const additionalClass = getAdditionalClass(isActive, className)

    return (
        <>
            <Link
                draggable='false'
                className={cn(
                    'relative flex w-full select-none items-center overflow-hidden rounded-md p-2 text-sm transition-colors hover:bg-background sm:hover:bg-border',
                    {
                        ['bg-border sm:bg-secondary']: isActive
                    },
                    additionalClass
                )}
                {...rest}>
                {Icon && (
                    <Icon
                        className={cn('mr-2 shrink-0', {
                            ['']: isActive
                        })}
                    />
                )}
                {label ?? children}
            </Link>
        </>
    )
}
