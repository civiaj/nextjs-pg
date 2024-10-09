'use client'
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLatest, useWindowSize } from '@/lib/hooks'

type Props = {
    renderFunction: (index: number, isScrolling: boolean) => ReactElement
    listItemsCount: number
    estimateHeight: (index: number) => number
    getItemKey: (index: number) => string
}

type VirtualItem = { key: string; index: number; height: number; offsetTop: number }

const TIMER_SCROLL_DELAY = 200
const OVERLAP = 3

const VirtualList = ({ listItemsCount, renderFunction, estimateHeight, getItemKey }: Props) => {
    const [isScrolling, setIsScrolling] = useState(false)
    const [positions, setPositions] = useState<Record<string, number>>({})
    const [scrollTop, setScrollTop] = useState(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const { height } = useWindowSize()

    const getItemHeight = useCallback(
        (index: number) => {
            const key = getItemKey(index)
            if (positions[key]) return positions[key]
            return estimateHeight(index)
        },
        [estimateHeight, positions, getItemKey]
    )

    const virtual = useMemo(() => {
        const rangeStart = scrollTop
        const rangeEnd = scrollTop + height - 100
        const rows: VirtualItem[] = Array(listItemsCount)
        let totalHeight = 0
        let startIndex = -1
        let endIndex = -1

        for (let index = 0; index < listItemsCount; index++) {
            const key = getItemKey(index)
            const height = getItemHeight(index)
            const offsetTop = totalHeight

            rows[index] = { key, index, height, offsetTop }

            if (startIndex === -1 && offsetTop + height > rangeStart) {
                startIndex = Math.max(0, index - OVERLAP)
            }

            if (endIndex === -1 && offsetTop + height >= rangeEnd) {
                endIndex = Math.min(listItemsCount - 1, index + OVERLAP)
            }

            totalHeight += height
        }

        if (endIndex === -1) endIndex = listItemsCount - 1

        return {
            virtualItems: rows.slice(startIndex, endIndex + 1),
            allItems: rows,
            totalHeight,
            startIndex,
            endIndex
        }
    }, [scrollTop, height, listItemsCount, getItemHeight, getItemKey])

    const latest = useLatest({ positions, getItemKey, allItems: virtual.allItems, scrollTop })

    const measureElementInner = useCallback(
        (element: Element | null, resizeObserver: ResizeObserver, entry?: ResizeObserverEntry) => {
            if (!element) {
                return
            }

            if (!element.isConnected) {
                resizeObserver.unobserve(element)
                return
            }

            const indexAttribute = element.getAttribute('data-index') || ''
            const index = parseInt(indexAttribute, 10)

            if (Number.isNaN(index)) {
                console.error('dynamic elements must have a valid `data-index` attribute')
                return
            }
            const { positions, getItemKey, allItems, scrollTop } = latest.current

            const key = getItemKey(index)
            const isResize = Boolean(entry)

            resizeObserver.observe(element)

            if (!isResize && typeof positions[key] === 'number') {
                return
            }

            const height =
                entry?.borderBoxSize[0]?.blockSize ?? element.getBoundingClientRect().height

            if (positions[key] === height) {
                return
            }

            const item = allItems[index]!
            const delta = height - item.height

            if (delta !== 0 && scrollTop > item.offsetTop) {
                requestAnimationFrame(() => {
                    document.documentElement.scrollBy(0, delta)
                })
            }

            setPositions((cache) => ({ ...cache, [key]: height }))
        },
        []
    )

    const resizeObserver = useMemo(() => {
        const ro = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                measureElementInner(entry.target, ro, entry)
            })
        })
        return ro
    }, [])

    const measureHeight = useCallback(
        (element: Element | null) => {
            measureElementInner(element, resizeObserver)
        },
        [resizeObserver]
    )

    useEffect(() => {
        const timer = timerRef.current

        const handleScroll = () => {
            setScrollTop(document.documentElement.scrollTop)

            if (timer) clearTimeout(timer)
            setIsScrolling(true)

            timerRef.current = setTimeout(() => {
                setIsScrolling(false)
            }, TIMER_SCROLL_DELAY)
        }

        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [])

    return (
        <div style={{ height: virtual.totalHeight }}>
            <div className='relative'>
                {virtual.virtualItems.map(({ index, key, offsetTop }) => (
                    <div
                        data-index={index}
                        key={key}
                        ref={measureHeight}
                        className='absolute w-full'
                        style={{ transform: `translateY(${offsetTop}px)` }}>
                        {renderFunction(index, isScrolling)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(VirtualList), {
    ssr: false
})
