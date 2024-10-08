export type TSortPostBy = 'popular' | 'date' | 'self'
export type TSortPostByPopular = 'today' | '24h' | 'week' | 'month' | 'year' | 'all'
export type TSortPostByDate = 'new' | '5' | '10'
export type TSortPostBySelf = 'popular' | 'new'

interface TPostFilterBase<T extends TSortPostBy> {
    page?: number
    limit?: number
    sortBy: T
}

interface TPopularPostFilterOptions extends TPostFilterBase<'popular'> {
    sortOption: TSortPostByPopular
}

interface TDatePostFilterOptions extends TPostFilterBase<'date'> {
    sortOption: TSortPostByDate
}

interface TSelfPostFilterOptions extends TPostFilterBase<'self'> {
    sortOption: TSortPostBySelf
}

export type TPostFilterOptions =
    | TPopularPostFilterOptions
    | TDatePostFilterOptions
    | TSelfPostFilterOptions

export const sortPostByVariants: { label: string; value: TSortPostBy }[] = [
    { label: 'Популярное', value: 'popular' },
    { label: 'Свежее', value: 'date' },
    { label: 'Моя лента', value: 'self' }
]

const formattedDate = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
const sortPostByPopularVariants: { label: string; value: TSortPostByPopular }[] = [
    { label: formattedDate, value: 'today' },
    { label: '24 часа', value: '24h' },
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
    { label: 'Год', value: 'year' },
    { label: 'Все время', value: 'all' }
]

const sortPostByDateVariants: { label: string; value: TSortPostByDate }[] = [
    { label: 'Новое', value: 'new' },
    { label: 'от 5+ часов', value: '5' },
    { label: 'от 10+ часов', value: '10' }
]

const sortPostBySelfVariants: { label: string; value: TSortPostBySelf }[] = [
    { label: 'По дате', value: 'new' },
    { label: 'По популярности', value: 'popular' }
]

export const sortPostOptions: Record<
    TSortPostBy,
    typeof sortPostBySelfVariants | typeof sortPostByDateVariants | typeof sortPostByPopularVariants
> = {
    date: sortPostByDateVariants,
    popular: sortPostByPopularVariants,
    self: sortPostBySelfVariants
}

export type TGroup = { id: string; name: string; uri: string }
export type TReactions = 'like' | 'dislike' | 'flame' | 'love' | 'poop'
export type TReactionsData = { type: TReactions; count: number }
export type TPostPreviewStats = {
    comments: number
    views: number
    opens: number
}

export type TPostPreview = {
    id: string
    title: string
    shortDescription: string
    previewImage?: string
    createdAt: string
    user: {
        id: string
        name: string
        avatar: string
        reactions: TReactions[]
    }
    reactions: TReactionsData[]
    stats: TPostPreviewStats
    group: TGroup
}

export type TPostContentType =
    | 'text'
    | 'header'
    | 'image'
    | 'video'
    | 'link'
    | 'quote'
    | 'list'
    | 'separator'
    | 'code'

export type TPostContentBlockMap = {
    text: TTextDataContent
    header: THeaderDataContent
    image: TImageDataContent
    video: TVideoDataContent
    link: TLinkDataContent
    quote: TQuoteDataContent
    list: TListDataContent
    separator: undefined
    code: TCodeDataContent
}

export type TPostContentBlock<T extends TPostContentType = TPostContentType> = {
    type: T
    data: TPostContentBlockMap[T]
}

export type TTextDataContent = {
    text: string
}

export type THeaderDataContent = {
    text: string
}

export type TImageDataContent = {
    type: 'slider' | 'regular'
    images: { url: string; description: string; id: number }[]
}

export type TVideoDataContent = {
    videos: { url: string; description: string; id: number }[]
}

export type TLinkDataContent = {
    url: string
}

export type TQuoteDataContent = {
    text: string
    signature?: string
}

export type TCodeDataContent = {
    text: string
}

export interface TPostDetails extends TPostPreview {
    content: TPostContentBlock[]
}
export type TListDataContent = {
    title?: string
    list: { text: string; id: number }[]
}
