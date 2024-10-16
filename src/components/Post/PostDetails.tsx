import Link from 'next/link'
import { Container } from '@/components/box/Container'
import { PostImage } from '@/components/Post/PostImage'
import { Reactions } from '@/components/Post/Reactions'
import { UserInfo } from '@/components/Post/UserInfo'
import { Text } from '@/components/typography/Text'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import {
    TPostContentBlock,
    TPostContentBlockMap,
    TPostDetails,
    TPostDetailsContent
} from '@/types/post.types'

type PostDetailsProps = {
    post: TPostDetails
}
type PostDetailsComponentData<T extends TPostDetailsContent> = {
    data: TPostContentBlockMap[T]
    className?: string
}
type PostDetailsComponent = React.FC<PostDetailsProps> & {
    Text: React.FC<PostDetailsComponentData<'text'>>
    Header: React.FC<PostDetailsComponentData<'header'>>
    Image: React.FC<PostDetailsComponentData<'image'>>
    Video: React.FC<PostDetailsComponentData<'video'>>
    Link: React.FC<PostDetailsComponentData<'link'>>
    Quote: React.FC<PostDetailsComponentData<'quote'>>
    List: React.FC<PostDetailsComponentData<'list'>>
    Separator: React.FC<PostDetailsComponentData<'separator'>>
    Code: React.FC<PostDetailsComponentData<'code'>>
}

export const PostDetails = (({ post }) => {
    const { content, createdAt, reactions, user } = post

    return (
        <Container withoutAnimation>
            <div className='mb-4 flex'>
                <UserInfo
                    createdAt={createdAt}
                    user={user}
                />
            </div>
            {content.map(renderComponent)}
            <Reactions reactions={{ data: reactions, byUser: user.reactions }} />
        </Container>
    )
}) as PostDetailsComponent

PostDetails.Text = ({ data }) => {
    const { text } = data
    return (
        <Text
            as='p'
            className='mb-4'>
            {text}
        </Text>
    )
}

PostDetails.Header = ({ data }) => {
    const { text } = data
    return (
        <Text
            as='h3'
            className='mb-4'>
            {text}
        </Text>
    )
}

PostDetails.Image = ({ data }) => {
    const { images, type } = data

    if (type === 'regular') {
        return (
            <>
                {images.map(({ description, url }, index) => (
                    <PostImage
                        key={index}
                        description={description}
                        src={url}
                        className={cn('m-0', {
                            ['mb-4']: index === images.length - 1,
                            ['mt-4']: index === 0
                        })}
                        classNameDescription={cn({ ['mb-0']: index === images.length - 1 })}
                    />
                ))}
            </>
        )
    }

    if (type === 'slider') {
        return (
            <Carousel
                opts={{
                    align: 'center'
                }}
                className='mx-10 select-none'>
                <CarouselContent>
                    {images.map(({ description, url }, index) => (
                        <CarouselItem
                            key={index}
                            className='flex'>
                            <PostImage
                                src={url}
                                className='flex-1'
                                description={description}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        )
    }

    return null
}

PostDetails.Video = () => {
    return null
}

PostDetails.Link = ({ data }) => {
    const { url } = data
    return <Link href={url}>{url}</Link>
}
PostDetails.Quote = ({ data }) => {
    const { text, signature } = data
    return (
        <div className='my-4 grid grid-cols-[3px,1fr] gap-8'>
            <div className='ml-2 h-full w-1 rounded-full bg-primary' />
            <div>
                <blockquote className='text-base font-medium'>{text}</blockquote>
                {signature && <cite className='text-sm font-bold'>— {signature}</cite>}
            </div>
        </div>
    )
}
PostDetails.List = ({ data }) => {
    const { list, title } = data
    return (
        <>
            {title && (
                <Text
                    as='h4'
                    className='mb-2'>
                    {title}
                </Text>
            )}
            <ul className='mb-3 flex list-inside list-disc flex-col gap-2'>
                {list.map(({ text }, index) => (
                    <li
                        key={index}
                        className='pl-2'>
                        {text}
                    </li>
                ))}
            </ul>
        </>
    )
}
PostDetails.Separator = () => {
    return (
        <div className='my-10 before:flex before:justify-center before:text-3xl before:opacity-90 before:content-["***"]' />
    )
}
PostDetails.Code = ({ data }) => {
    const { text } = data
    return (
        <div className='my-6 rounded-md bg-muted p-2'>
            <code>{text}</code>
        </div>
    )
}

PostDetails.Text.displayName = 'PostDetailsText'
PostDetails.Header.displayName = 'PostDetailsHeader'
PostDetails.Image.displayName = 'PostDetailsImage'
PostDetails.Video.displayName = 'PostDetailsVideo'
PostDetails.Link.displayName = 'PostDetailsLink'
PostDetails.Quote.displayName = 'PostDetailsQuote'
PostDetails.List.displayName = 'PostDetailsList'
PostDetails.Separator.displayName = 'PostDetailsSeparator'
PostDetails.Code.displayName = 'PostDetailsCode'

const contentMap: {
    [K in TPostDetailsContent]: React.ComponentType<PostDetailsComponentData<K>>
} = {
    code: PostDetails.Code,
    text: PostDetails.Text,
    header: PostDetails.Header,
    image: PostDetails.Image,
    link: PostDetails.Link,
    list: PostDetails.List,
    quote: PostDetails.Quote,
    separator: PostDetails.Separator,
    video: PostDetails.Video
}

const renderComponent = <K extends TPostDetailsContent>(
    { data, type }: TPostContentBlock<K>,
    index: number
) => {
    const Component = contentMap[type] as React.ComponentType<PostDetailsComponentData<K>>
    return (
        <Component
            data={data}
            key={index}
        />
    )
}
