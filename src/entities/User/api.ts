import { wait } from '@/lib/utils'
import { TUser } from '@/types/user.types'

const user: TUser = {
    avatar: '',
    createdAt: new Date().toISOString(),
    email: 'evgeniyshlenskiy@gmail.com',
    id: '1',
    name: 'Evgeniy',
    password: '123',
    role: 'admin',
    updatedAt: ''
}

export const getMe = async () => {
    await wait(500)
    return user
}
