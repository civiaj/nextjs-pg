import { Skeleton as S } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Props = {
    skeletonFor: 'VirtualList'
}

export const Skeleton = ({ skeletonFor }: Props) => {
    if (skeletonFor === 'VirtualList')
        return Array.from({ length: 4 }, (_, i) => i).map((_, index) => (
            <div
                key={index}
                className='w-full pb-2 md:pb-6'>
                <S
                    className={cn('h-full bg-primary/5 p-4 md:p-6', {
                        ['rounded-tl-none rounded-tr-none']: index === 0
                    })}>
                    <div className='flex items-center gap-4 pb-4'>
                        <S className='h-10 w-10 shrink-0 rounded-full' />
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col gap-1'>
                                <S className='h-3 w-24' />
                                <S className='h-3 w-36' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 pb-6'>
                        <S className='h-3 w-10/12' />
                        <S className='h-3 w-1/2' />
                        <S className='h-3 w-full' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <S className='h-3 w-10/12' />
                        <S className='h-3 w-[70%]' />
                        <S className='h-3 w-[65%]' />
                        <S className='h-3 w-1/2' />
                        <S className='h-3 w-[90%]' />
                        <S className='h-3 w-[80%]' />
                        <S className='h-3 w-[75%]' />
                        <S className='h-3 w-full' />
                    </div>

                    <div className='flex gap-2 pt-6'>
                        <S className='h-8 w-12 rounded-xl' />
                        <S className='h-8 w-12 rounded-xl' />
                        <S className='h-8 w-12 rounded-xl' />
                    </div>
                </S>
            </div>
        ))

    return null
}
