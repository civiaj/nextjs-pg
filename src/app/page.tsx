import { PostList } from '@/components/Post/PostList'
import User from '@/db/models/user.model'

export default async function Home() {
    const users = await User.findAll({ raw: true })
    console.log(users)

    return (
        <>
            <PostList />
        </>
    )
}
