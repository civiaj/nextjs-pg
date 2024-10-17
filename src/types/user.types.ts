import { TimeStamp } from '@/types/common.types'

export type TUserRole = 'ADMIN' | 'USER'

export interface TUser extends TimeStamp {
    id: string
    name: string
    email: string
    password: string
    avatar: string | null
    role: TUserRole
}

export type UserMe = Pick<TUser, 'avatar' | 'email' | 'name' | 'id' | 'role'>
