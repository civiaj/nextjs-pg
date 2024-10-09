import { TPostPreview } from '@/entities/Post/types'

const createdAt = new Date().toISOString()
export const test: TPostPreview[] = Array.from({ length: 10000 }, (_, i) => ({
    id: i + '' + 'id',
    title: `Глава Ubisoft ${i}: «Мы не стремимся продвигать какую-либо конкретную повестку, мы делаем игры» `,
    shortDescription:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt minus neque ipsa porro, asperiores perferendis laborum deserunt optio minima, esse alias nam ipsam natus dignissimos temporibus laudantium quos cupiditate unde.',
    previewImage:
        i % 2 === 0
            ? 'https://i2.wp.com/photornia.com/wp-content/uploads/2019/06/DSC_3106.jpg?fit=618%2C927&ssl=1'
            : 'https://leonardo.osnova.io/5b1cb10d-1e3d-540c-a710-8bd4e2482d06/-/preview/592x/-/format/webp',
    reactions: [
        { type: 'flame', count: i * 3 },
        { type: 'love', count: i * 4 }
    ],

    createdAt,
    user: {
        name: 'John Doe',
        avatar: 'https://example.com/johndoe-avatar.png',
        reactions: ['flame', 'love'],
        id: i + 'user'
    },
    stats: {
        comments: i * 10,
        views: i * 4,
        opens: i * 3
    },
    group: {
        id: i + 'group',
        name: 'ChatGPT Slaves',
        uri: '/gptslaves'
    }
}))
export const postsPerPage = 100

export const getPosts = async (page: number) => {
    await new Promise((res) => setTimeout(res, 3000))
    const start = postsPerPage * page
    const end = start + postsPerPage
    return { posts: test.slice(start, end), itemsCount: test.length }
}
