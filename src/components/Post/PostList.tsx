'use client'

import { useState, useCallback, useEffect } from 'react'
import { Container } from '@/components/box/Container'
import { PostFilter } from '@/components/Post/PostFilter'
import { PostPreview } from '@/components/Post/PostPreview'
import { Skeleton } from '@/components/Skeleton'
import { PostListLoading } from '@/components/ui/loading-indicator'
import VirtualList from '@/components/VirtualList'
import { getPosts, test } from '@/entities/Post/api'
import { useIntersectionObserver } from '@/lib/hooks'
import { TPostPreview } from '@/types/post.types'

export const PostList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isInitial, setIsInitial] = useState(true)
    const [isError, setIsError] = useState<string | null>(null)

    const [page, setPage] = useState(0)
    const [posts, setPosts] = useState<TPostPreview[]>([])

    const onScrollEnd = useCallback(async () => {
        try {
            setIsLoading(true)
            setIsError(null)
            const { posts } = await getPosts(page)
            setPosts((p) => [...p, ...posts])
            setPage((p) => p + 1)
        } catch (error) {
            setIsError(error instanceof Error ? error.message : 'Error')
        } finally {
            setIsLoading(false)
        }
    }, [page])

    const observerRef = useIntersectionObserver({
        onScrollEnd: onScrollEnd,
        shouldStart: !isLoading,
        stopObserver: posts.length >= test.length
    })

    const getItemKey = useCallback((index: number) => posts[index].id, [posts])
    const renderFunction = useCallback(
        (index: number) => (
            <PostPreview
                index={index}
                post={posts[index]}
            />
        ),
        [posts]
    )

    useEffect(() => {
        if (isInitial) {
            onScrollEnd().then(() => {
                window.scrollTo({ top: 0 })
                setIsInitial(false)
            })
        }
    }, [onScrollEnd, isInitial])

    if (isError) {
        console.log(isError)
    }

    return (
        <>
            <PostFilter />

            {isInitial && <Skeleton skeletonFor='VirtualList' />}

            <VirtualList
                listItemsCount={posts.length}
                estimateHeight={() => 200}
                getItemKey={getItemKey}
                renderFunction={renderFunction}
            />

            <Container
                ref={observerRef}
                className='mb-4'>
                <PostListLoading />
            </Container>
        </>
    )
}
