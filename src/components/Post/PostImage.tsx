import Image from 'next/image'
import { Text } from '@/components/typography/Text'
import { cn } from '@/lib/utils'

type Props = {
    src?: string
    className?: string
    description?: string
    classNameDescription?: string
    withPreview?: string
}

export const PostImage = (props: Props) => {
    const { src, className, description, classNameDescription } = props
    if (!src) return null

    return (
        <div className={cn('my-4 flex flex-col gap-1', className)}>
            <div className='relative flex flex-1 items-center justify-center overflow-hidden rounded-xl'>
                <div
                    className='absolute inset-0 z-[0] max-h-[400px] min-h-[200px] scale-125 bg-cover bg-center opacity-50 blur-3xl filter md:max-h-[500px] md:min-h-[300px]'
                    style={{ background: `url(${src})` }}></div>

                <div className='relative flex-1'>
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
                    className={cn('pl-6 text-sm italic', classNameDescription)}
                    as='p'>
                    {description}
                </Text>
            )}
        </div>
    )
}
