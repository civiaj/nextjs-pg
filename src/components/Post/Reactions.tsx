import { ComponentType, useMemo } from 'react'
import { Flame, Heart, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { TReactions, TReactionsData } from '@/types/post.types'

const reactionIcons: Record<TReactions, ComponentType> = {
    love: Heart,
    flame: Flame
}
const reactionIconsFill: Record<TReactions, string> = {
    love: 'rgb(239 68 68)',
    flame: 'orange'
}

type Props = {
    reactions: { data: TReactionsData[]; byUser: TReactions[] }
}

export const Reactions = ({ reactions }: Props) => {
    const { data, byUser } = reactions
    const unusedReactions = useMemo(() => {
        return data.filter((reaction) => reaction.count === 0).map((reaction) => reaction.type)
    }, [data])

    return (
        <div className='mt-4 flex flex-wrap gap-1'>
            {data.map(({ count, type }) => {
                const isUnused = unusedReactions.includes(type)
                if (isUnused) return
                const Icon = reactionIcons[type] as React.FC<React.SVGProps<SVGSVGElement>>
                const userReacted = byUser.includes(type)

                const fill = userReacted ? reactionIconsFill[type] : 'none'
                const color = userReacted ? reactionIconsFill[type] : 'currentColor'

                return (
                    <Button
                        key={type}
                        variant={'outline'}
                        className={cn(
                            'flex h-8 items-center justify-center gap-1 rounded-xl px-2 md:gap-2',
                            {
                                ['border-blue-300 bg-blue-100 hover:bg-blue-200 dark:border-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800']:
                                    userReacted
                            }
                        )}>
                        <Icon
                            height={20}
                            width={24}
                            fill={fill}
                            color={color}
                        />
                        {count !== 0 && <div className='text-sm font-medium'>{count}</div>}
                    </Button>
                )
            })}
            {unusedReactions.length !== 0 && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'outline'}
                            className='flex h-8 items-center justify-center gap-2 rounded-xl px-2'>
                            <Plus
                                height={20}
                                width={24}
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side='right'
                        align='center'
                        className='flex min-w-0 rounded-xl p-0 shadow'>
                        {unusedReactions.map((type) => {
                            const Icon = reactionIcons[type] as React.FC<
                                React.SVGProps<SVGSVGElement>
                            >

                            const fill = reactionIconsFill[type]
                            const color = reactionIconsFill[type]

                            return (
                                <DropdownMenuItem
                                    key={type}
                                    className='cursor-pointer'>
                                    <Icon
                                        height={20}
                                        width={24}
                                        fill={fill}
                                        color={color}
                                    />
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}
