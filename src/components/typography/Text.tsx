import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

type Props = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
    children?: React.ReactNode
    className?: string
} & React.HTMLAttributes<HTMLHeadingElement>

const styles = cva('', {
    variants: {
        as: {
            h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl leading-7',
            h2: 'scroll-m-20 mb-2 text-3xl font-semibold tracking-tight first:mt-0 leading-7',
            h3: 'scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight leading-7 mb-2',
            h4: 'scroll-m-20 text-lg md:text-xl font-semibold tracking-tight leading-7',
            p: 'leading-6 mb-2',
            span: 'leading-6 mb-2'
        }
    },
    defaultVariants: {
        as: 'p'
    }
})

export const Text = (props: Props) => {
    const { as = 'p', children, className } = props
    const Heading = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        return React.createElement(as, props, children)
    }

    return <Heading className={cn(styles({ as, className }))}>{children}</Heading>
}
