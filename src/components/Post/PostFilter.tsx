import { useMemo } from 'react'
import { Container } from '@/components/box/Container'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { sortPostByVariants, sortPostOptions } from '@/entities/Post/types'
import { uiSlice } from '@/lib/store/features/ui/uiSlice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'

export const PostFilter = () => {
    const { filterOption, sortOption } = useAppSelector(uiSlice.selectors.getPostFilter)
    const dispatch = useAppDispatch()

    const filterLabel = useMemo(() => {
        const options = sortPostOptions[filterOption]
        return options.find((option) => option.value === sortOption)?.label
    }, [filterOption, sortOption])

    const onSetFilterOption = (value: string) => {
        const typed = sortPostByVariants.find((option) => option.value === value)?.value
        if (typed) dispatch(uiSlice.actions.setPostFilterOption(typed))
    }

    const onSetSortOption = (value: string) => () => {
        const typed = sortPostOptions[filterOption].find((option) => option.value === value)?.value
        if (typed) dispatch(uiSlice.actions.setPostSortOption(typed))
    }

    return (
        <Container className='flex flex-wrap justify-between gap-2 rounded-bl-none rounded-br-none border-b py-2 fade-in-100 md:py-4'>
            <Tabs
                value={filterOption}
                onValueChange={onSetFilterOption}>
                <TabsList>
                    {sortPostByVariants.map(({ label, value }) => (
                        <TabsTrigger
                            key={value}
                            value={value}>
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        size='default'>
                        {filterLabel}
                        <span className='sr-only'>Поменять фильтр</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    {sortPostOptions[filterOption].map(({ label, value }) => (
                        <DropdownMenuItem
                            onClick={onSetSortOption(value)}
                            className='font-medium'
                            key={value}>
                            {label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </Container>
    )
}
