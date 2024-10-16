export type TSortPostBy = 'popular' | 'date' | 'self'
type TSortPostByPopular = 'today' | '24h' | 'week' | 'month' | 'year' | 'all'
type TSortPostByDate = 'new' | '5' | '10'
type TSortPostBySelf = 'popular' | 'new'

interface TPostFilterBase<T extends TSortPostBy> {
    filterOption: T
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
    { label: '+5 часов', value: '5' },
    { label: '+10 часов', value: '10' }
]

const sortPostBySelfVariants: { label: string; value: TSortPostBySelf }[] = [
    { label: 'По дате', value: 'new' },
    { label: 'По популярности', value: 'popular' }
]

type TSortPostByValues =
    | typeof sortPostBySelfVariants
    | typeof sortPostByDateVariants
    | typeof sortPostByPopularVariants

export const sortPostOptions: Record<TSortPostBy, TSortPostByValues> = {
    date: sortPostByDateVariants,
    popular: sortPostByPopularVariants,
    self: sortPostBySelfVariants
}

export type TGroup = { id: string; name: string; uri: string }
export type TReactions = 'flame' | 'love'
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

export type TPostDetailsContent =
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
    text: TPostDetailsText
    header: TPostDetailsHeader
    image: TPostDetailsImage
    video: TPostDetailsVideo
    link: TPostDetailsLink
    quote: TPostDetailsQuote
    list: TPostDetailsList
    code: TPostDetailsCode
    separator: TPostDetailsSeparator
}

export type TPostContentBlock<T extends TPostDetailsContent = TPostDetailsContent> = {
    type: T
    data: TPostContentBlockMap[T]
}

export type TPostDetailsText = {
    text: string
}

export type TPostDetailsHeader = {
    text: string
}

export type TPostDetailsImage = {
    type: 'slider' | 'regular'
    images: { url: string; description: string }[]
}

export type TPostDetailsVideo = {
    videos: { url: string; description: string }[]
}

export type TPostDetailsLink = {
    url: string
}

export type TPostDetailsQuote = {
    text: string
    signature?: string
}

export type TPostDetailsCode = {
    text: string
}

export type TPostDetailsList = {
    title?: string
    list: { text: string }[]
}

export type TPostDetailsSeparator = undefined

export interface TPostDetails extends TPostPreview {
    content: TPostContentBlock[]
}
