import Image from 'next/image'
import { Container } from '@/components/box/Container'
import { Text } from '@/components/typography/Text'
import { TPostPreview } from '@/entities/Post/types'

type Props = {
    index: number
    post: TPostPreview
}

export const PostPreview = (props: Props) => {
    const { index, post } = props
    const { createdAt, group, id, reactions, shortDescription, stats, title, user, previewImage } =
        post

    return (
        <div className='py-2'>
            <Container>
                <Text as='h3'>{title}</Text>
                <Text as='p'>{shortDescription}</Text>
                {/* {previewImage && (
                    <Image
                        src={previewImage}
                        alt='preview'
                        width={200}
                        height={200}
                    />
                )} */}
            </Container>
        </div>
    )
}
