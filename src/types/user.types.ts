import { TimeStamp } from '@/types/common.types'

export type TUserRole = 'admin' | 'user'

export interface TUser extends TimeStamp {
    id: string
    name: string
    email: string
    password: string
    avatar: string | null
    role: TUserRole
}

export type UserMe = Pick<TUser, 'avatar' | 'email' | 'name' | 'id' | 'role'>
