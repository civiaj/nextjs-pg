import { PostDetails } from '@/components/Post/PostDetails'
import { getPost } from '@/entities/Post/api'

const Page = async ({ params }: { params: { id: string } }) => {
    const post = await getPost(params.id)

    return (
        <>
            <PostDetails post={post} />
        </>
    )
}

export default Page
