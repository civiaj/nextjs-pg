'use client'

import { useAppSelector } from '@/lib/store/hooks'

const Page = ({ params }: { params: { id: string } }) => {
    const sidebarIsOpen = useAppSelector((state) => state.ui.sidebarIsOpen)
    const title = sidebarIsOpen ? 'Деактивировать' : 'Активировать'
    console.log(params)
    return <div>{title}</div>
}

export default Page
