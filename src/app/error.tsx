'use client'

import { Container } from '@/components/box/Container'
import { Text } from '@/components/typography/Text'
import { Button } from '@/components/ui/button'

const Page = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    console.log(error)
    return (
        <Container
            className='flex flex-col items-center gap-6'
            withoutAnimation>
            <Text as='h4'>{error.message}</Text>
            <Button
                variant={'default'}
                onClick={reset}>
                Перезагрузить
            </Button>
        </Container>
    )
}

export default Page
