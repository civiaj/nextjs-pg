import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/box/Container'
import { Text } from '@/components/typography/Text'
import { Button } from '@/components/ui/button'
import { PATH } from '@/shared/const'

export const metadata: Metadata = {
    title: '404 | Страница не найдена'
}

export default function NotFound() {
    return (
        <>
            <Container
                withoutAnimation
                className='flex flex-col'>
                <div className='flex h-24 items-center justify-center'>
                    <Text as='p'>Страница не найдена</Text>
                </div>
                <Link
                    href={PATH.MAIN}
                    className='self-center'>
                    <Button variant={'outline'}>На главную</Button>
                </Link>
            </Container>
        </>
    )
}
