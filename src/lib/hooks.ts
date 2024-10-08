'use client'

import { useInsertionEffect, useEffect, useRef, useState } from 'react'

type TUseIntersectionObserver = {
    onScrollEnd: () => void | Promise<void>
    shouldStart: boolean
    stopObserver?: boolean
    observerTarget?: HTMLDivElement | null
}

export const useLatest = <T>(value: T) => {
    const ref = useRef(value)

    useInsertionEffect(() => {
        ref.current = value
    })

    return ref
}

const getWindowSize = () => {
    const { innerHeight, innerWidth } = window
    return { height: innerHeight, width: innerWidth }
}

export const useWindowSize = () => {
    const [state, setState] = useState(getWindowSize)

    useEffect(() => {
        const handleResize = () => setState(getWindowSize())

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return state
}

export const useIntersectionObserver = (props: TUseIntersectionObserver) => {
    const inner = useRef<HTMLDivElement | null>(null)
    const { onScrollEnd, shouldStart, observerTarget, stopObserver } = props

    useEffect(() => {
        const target = observerTarget ?? inner.current

        if (!target || stopObserver) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && shouldStart) {
                    onScrollEnd()
                }
            },
            { rootMargin: '10px', threshold: 0.5 }
        )

        observer.observe(target)
        return () => {
            observer.unobserve(target)
        }
    }, [onScrollEnd, shouldStart, observerTarget, stopObserver])

    return inner
}
