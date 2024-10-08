import { TimeStamp } from '@/shared/types'

export type UserRole = 'admin' | 'user'

export interface User extends TimeStamp {
    id: string
    name: string
    email: string
    password: string
    avatar: string | null
    role: UserRole
}

export type UserMe = Pick<User, 'avatar' | 'email' | 'name' | 'id' | 'role'>
