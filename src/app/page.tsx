'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Home() {
    const [isActive, setIsActive] = useState(false)
    const buttonTitle = isActive ? 'Деактивировать' : 'Активировать'

    return <Button onClick={() => setIsActive((p) => !p)}>{buttonTitle}</Button>
}
