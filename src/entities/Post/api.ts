import { TPostDetails, TPostPreview } from '@/entities/Post/types'

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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getPosts = async (page: number) => {
    await wait(1000)
    const start = postsPerPage * page
    const end = start + postsPerPage
    return { posts: test.slice(start, end), itemsCount: test.length }
}

export const postDetail: TPostDetails = {
    id: '1',
    title: 'Understanding TypeScript',
    shortDescription: 'A brief introduction to TypeScript and its benefits.',
    previewImage: 'https://example.com/image.jpg',
    createdAt: '2024-09-27T10:00:00Z',
    user: {
        id: '42',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
        reactions: ['flame', 'love']
    },
    reactions: [
        { type: 'love', count: 75 },
        { type: 'flame', count: 30 }
    ],
    stats: {
        comments: 12,
        views: 500,
        opens: 400
    },
    group: {
        id: '101',
        name: 'Programming',
        uri: '/groups/programming'
    },
    content: [
        {
            type: 'header',
            data: {
                text: 'What is TypeScript?'
            }
        },
        {
            type: 'text',
            data: {
                text: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
            }
        },
        {
            type: 'image',
            data: {
                type: 'slider',
                images: [
                    {
                        description: 'Пример описания',
                        url: 'https://leonardo.osnova.io/464d2955-d32a-5fab-bb6b-6de29dacdb58/-/preview/592x/-/format/webp'
                    },

                    {
                        description: 'Пример описания 2',
                        url: 'https://leonardo.osnova.io/73140be6-2e5a-5418-ba7f-96bf90a70f8e/-/preview/2300x/'
                    }
                ]
            }
        },
        {
            type: 'list',
            data: {
                title: 'Заголовок листа',
                list: [
                    { text: 'Supports static typing' },
                    { text: 'Offers better code refactoring' },
                    { text: 'Enhances developer productivity' }
                ]
            }
        },
        {
            type: 'quote',
            data: {
                text: 'TypeScript brings type safety to JavaScript.',
                signature: 'Microsoft'
            }
        },
        {
            type: 'code',
            data: {
                text: `const message: string = "Hello, TypeScript!";`
            }
        },
        {
            type: 'header',
            data: {
                text: 'What is TypeScript?'
            }
        },
        { type: 'separator', data: undefined },
        {
            type: 'text',
            data: {
                text: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
            }
        },
        {
            type: 'video',
            data: {
                videos: [
                    {
                        description: 'Пример описания',
                        url: 'https://example.com/typescript-logo.png'
                    },
                    {
                        description: 'Пример описания',
                        url: 'https://example.com/typescript-logo.png'
                    }
                ]
            }
        },
        {
            type: 'image',
            data: {
                type: 'slider',
                images: [
                    {
                        description: 'Пример описания',
                        url: 'https://leonardo.osnova.io/464d2955-d32a-5fab-bb6b-6de29dacdb58/-/preview/592x/-/format/webp'
                    },

                    {
                        description: 'Пример описания 2',
                        url: 'https://leonardo.osnova.io/73140be6-2e5a-5418-ba7f-96bf90a70f8e/-/preview/2300x/'
                    }
                ]
            }
        },
        {
            type: 'list',
            data: {
                title: 'Заголовок листа',
                list: [
                    { text: 'Supports static typing' },
                    { text: 'Offers better code refactoring' },
                    { text: 'Enhances developer productivity' }
                ]
            }
        },
        {
            type: 'quote',
            data: {
                text: 'TypeScript brings type safety to JavaScript.',
                signature: 'Microsoft'
            }
        },
        {
            type: 'code',
            data: {
                text: `const message: string = "Hello, TypeScript!";`
            }
        },
        {
            type: 'header',
            data: {
                text: 'What is TypeScript?'
            }
        },
        {
            type: 'text',
            data: {
                text: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
            }
        },
        {
            type: 'video',
            data: {
                videos: [
                    {
                        description: 'Пример описания',
                        url: 'https://example.com/typescript-logo.png'
                    },
                    {
                        description: 'Пример описания',
                        url: 'https://example.com/typescript-logo.png'
                    }
                ]
            }
        }
    ]
}

export const getPost = async (postId: string) => {
    console.log(`getting post ${postId}...`)
    await wait(1000)
    return postDetail
}
