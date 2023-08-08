import * as RdxSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface SelectProps {
  className?: string
  error?: string
  placeholder?: string
  options: {
    value: string
    label: string
  }[]
  onChange?(value: string): void
  value?: string
}

export function Select({className, error, placeholder, options, onChange, value}: SelectProps) {
  const [ selectedValue, setSelectedValue ] = useState(value ?? '')

  function handleSelect(value: string){
    setSelectedValue(value)
    onChange?.(value)
  }

  return (
    <div>
      <div className="relative">
        <label
          data-select={!!selectedValue}
          className='absolute z-[10] top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none data-[select=true]:text-xs data-[select=true]:left-[13px] data-[select=true]:top-2 data-[select=true]:translate-y-0 transition-all'>
          {placeholder}
        </label>
        <RdxSelect.Root value={value} onValueChange={handleSelect}>
          <RdxSelect.Trigger
            data-error={!!error}
            className={twMerge('w-full h-[52px] rounded-lg border border-gray-400 bg-white px-3 text-gray-800 focus:border-gray-800 transition-all outline-none data-[error=true]:!border-red-900 text-left relative pt-4', className)}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className='w-6 h-6 text-gray-800' />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content 
                className="overflow-hidden z-[99] bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]"
              >
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>
              <RdxSelect.Viewport className="p-2">
                {options.map(option => (
                  <RdxSelect.Item
                  key={option.value}
                  value={option.value}  
                  className='p-2 text-gray-800 text-sm data-[state=checked]:font-bold data-[highlighted]:bg-gray-200 outline-none rounded-lg transition-colors'
              >
                <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText> 
              </RdxSelect.Item>
                ))}

              </RdxSelect.Viewport>
              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>
      


      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900 ">
          <CrossCircledIcon />
          <span className=" text-sm ">{error}</span>
        </div>
      )}
    </div>

  )
}