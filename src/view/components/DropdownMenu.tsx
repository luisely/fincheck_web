import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../app/utils/cn'

export function DropdownMenuRoot({children}: {children: React.ReactNode}) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  )
}

export function DropdownMenuTrigger({children}: {children: React.ReactNode}) {
  return (
    <RdxDropdownMenu.Trigger className='outline-none' asChild>
      {children}
    </RdxDropdownMenu.Trigger>
  )
}

interface DropdownMenuContentProps{
  children:React.ReactNode
  className?: string
  side?: string
}

export function DropdownMenuContent({children, className}: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'rounded-2xl z-[99] p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]', 
          'data-[side=bottom]:animate-slideUpAndFade', 
          'data-[side=top]:animate-slideDownAndFade', 
          className)}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  )
}

interface DropdownMenuItemProps{
  children:React.ReactNode
  className?: string
  onSelect?(): void
}

export function DropdownMenuItem({children, className, onSelect}: DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn('flex items-center justify-between cursor-pointer h-10 outline-none px-2 py-6 text-sm text-gray-800 data-[highlighted]:bg-gray-200/20 data-[highlighted]:font-bold rounded-2xl transition-all', className)}
    >
      {children}
    </RdxDropdownMenu.Item>
  )
}


export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem
}