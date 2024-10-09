import Image from 'next/image'
import { Text } from '@/components/typography/Text'
import { cn } from '@/lib/utils'

type Props = {
    src?: string
    className?: string
    description?: string
}

export const PostImage = ({ src, className, description }: Props) => {
    if (!src) return null

    return (
        <div className='mb-2 mt-4 flex flex-col gap-1'>
            <div className={cn('relative overflow-hidden rounded-xl', className)}>
                <div
                    className='absolute inset-0 z-[0] max-h-[400px] min-h-[200px] scale-125 bg-cover bg-center opacity-50 blur-3xl filter md:max-h-[500px] md:min-h-[300px]'
                    style={{ background: `url(${src})` }}></div>
                <div className='relative'>
                    <Image
                        src={src}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='h-auto max-h-[300px] min-h-[200px] w-full bg-transparent object-contain md:max-h-[400px] md:min-h-[300px]'
                        priority
                        alt=''></Image>
                </div>
            </div>
            {description && (
                <Text
                    className='-mb-2 pl-4 text-sm italic'
                    as='p'>
                    {description}
                </Text>
            )}
        </div>
    )
}
