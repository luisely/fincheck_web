import { ComponentProps } from 'react'
import { cn } from '../../app/utils/cn'
import { Spinner } from './Spinner'

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  design?: 'danger' | 'ghost'
}

export function Button({className,isLoading,disabled,children,design, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      data-design={design}
      className={cn('bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center',
      'data-[design=danger]:bg-red-800 hover:data-[design=danger]:bg-red-700', 
      'data-[design=ghost]:bg-transparent data-[design=ghost]:text-gray-800 data-[design=ghost]:border data-[design=ghost]:border-gray-800 hover:data-[design=ghost]:bg-gray-200', 
      className)}
    >
      {!isLoading && children}
      {isLoading && <Spinner className='w-6 h-6'/>}
    </button>
  )
}
