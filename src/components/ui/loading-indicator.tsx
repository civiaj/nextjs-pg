import { cn } from '@/lib/utils'

const renderDots = Array.from({ length: 3 }).map((_, index) => (
    <div
        key={index}
        className={cn(
            'h-[6px] w-[6px] animate-pulse rounded-full bg-muted-foreground transition-colors duration-1000',
            {
                ['delay-0']: index === 0,
                ['delay-100']: index === 1,
                ['delay-200']: index === 2
            }
        )}></div>
))

export const PostListLoading = () => {
    return <div className='flex items-center justify-center gap-1'>{renderDots}</div>
}
