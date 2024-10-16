import { PATH } from '@/shared/const'

export type InferObjectValueType<T> = T extends { [key: string]: infer U } ? U : never
export type TPath = InferObjectValueType<typeof PATH>
export type ResponseError = { message: string; errors: string[] }
export type ResponseErrorHook = { data: ResponseError; status: number }
export type ProcessedErrorType = 'server' | 'form'
export type ProcessedError = { type: ProcessedErrorType; error: string } | null
export type TimeStamp = {
    createdAt: string
    updatedAt: string
}
