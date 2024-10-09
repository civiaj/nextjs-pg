import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TUser } from '@/entities/User/types'
import { PATH } from '@/shared/const'
import { TimeStamp } from '@/shared/types'

type Props = { createdAt: TimeStamp['createdAt']; user: Pick<TUser, 'avatar' | 'name' | 'id'> }

export const UserInfo = ({ createdAt, user }: Props) => {
    return (
        <div className='relative flex items-center gap-4 self-start'>
            <Avatar>
                <AvatarImage src={user.avatar!} />
                <AvatarFallback className='font-bold'>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-start gap-0'>
                <span className='font-medium leading-5'>{user.name}</span>
                <span className='text-xs'>
                    {new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(
                        new Date(createdAt)
                    )}
                </span>
            </div>
            <Link
                className='absolute inset-0'
                href={PATH.USER + '/' + user.id}
            />
        </div>
    )
}
