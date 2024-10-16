import { Metadata } from 'next'
import { PostDetails } from '@/components/Post/PostDetails'
import { getPost } from '@/entities/Post/api'

type PageParams = { params: { id: string } }

export async function generateMetadata({ params }: PageParams) {
    const { title } = await getPost(params.id)

    const metadata: Metadata = {
        title
    }

    return metadata
}

const Page = async ({ params }: PageParams) => {
    const post = await getPost(params.id)

    return (
        <>
            <PostDetails post={post} />
        </>
    )
}

export default Page
