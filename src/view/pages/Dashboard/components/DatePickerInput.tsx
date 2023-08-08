import { CrossCircledIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { formatDate } from "../../../../app/utils/formatDate"
import { Popover } from "../../../components/Popover"
import { DatePicker } from "../../../components/DatePicker"

interface DatePickerInputProps {
  error?: string
  className?: string
  value?: Date
  onChange?(date: Date): void
}


export function DatePickerInput({error, className, value, onChange}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date())

  function handleChangeDate(date: Date) {
    setSelectedDate(date)
    onChange?.(date)
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type='button'
            data-error={!!error}
            className={twMerge('w-full h-[52px] rounded-lg border border-gray-400 bg-white px-3 text-gray-700 focus:border-gray-800 transition-all outline-none data-[error=true]:!border-red-900 text-left relative pt-4', className)}
            >
            
            <span className="text-gray-700 text-xs left-[13px] absolute top-2 pointer-events-none">Data</span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
          value={selectedDate}
          onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>


      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900 ">
          <CrossCircledIcon />
          <span className=" text-sm ">{error}</span>
        </div>
      )}
    </div>
  )
}
