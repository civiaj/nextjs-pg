import { cn } from '@/lib/utils'

export const Overlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <div
            onClick={onClose}
            className={cn('hidden', {
                ['fixed inset-0 z-10 block bg-black/20 dark:bg-black/40 sm:hidden']: isOpen
            })}
            style={{}}
        />
    )
}
