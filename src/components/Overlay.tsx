import { cn } from '@/lib/utils'

export const Overlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <div
            onClick={onClose}
            className={cn('sm:hidden', {
                ['fixed inset-0 z-10 bg-black/20 dark:bg-black/40']: isOpen
            })}
            style={{}}
        />
    )
}
