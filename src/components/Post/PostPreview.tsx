import Link from 'next/link'
import { Container } from '@/components/box/Container'
import { PostImage } from '@/components/Post/PostImage'
import { Reactions } from '@/components/Post/Reactions'
import { UserInfo } from '@/components/Post/UserInfo'
import { Text } from '@/components/typography/Text'
import { cn } from '@/lib/utils'
import { PATH } from '@/shared/const'
import { TPostPreview } from '@/types/post.types'

type Props = {
    index: number
    post: TPostPreview
}

export const PostPreview = (props: Props) => {
    const { index, post } = props
    const { createdAt, id, reactions, shortDescription, title, user, previewImage } = post

    return (
        <div className={cn('pb-2 md:pb-4')}>
            <Container className={cn({ ['rounded-tl-none rounded-tr-none']: index === 0 })}>
                <div className='mb-2 flex'>
                    <UserInfo
                        createdAt={createdAt}
                        user={user}
                    />
                </div>
                <div className='relative'>
                    <Text
                        as='h3'
                        className='line-clamp-3'>
                        {title}
                    </Text>
                    <Text
                        as='p'
                        className='line-clamp-6'>
                        {shortDescription}
                    </Text>
                    <PostImage src={previewImage} />

                    <Link
                        className='absolute inset-0'
                        href={PATH.POST + '/' + id}
                    />
                </div>
                <Reactions reactions={{ data: reactions, byUser: user.reactions }} />
            </Container>
        </div>
    )
}
