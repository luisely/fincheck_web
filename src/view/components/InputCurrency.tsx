
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { NumericFormat } from 'react-number-format'

interface InputCurrencyProps {
  error?: string
  value?: string | number
  onChange?(value: string): void
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        data-error={!!error}
        thousandSeparator='.'
        decimalSeparator=','
        onChange={event => onChange?.(event.target.value)}
        className='w-full text-[32px] font-bold tracking-tight outline-none data-[error=true]:text-red-900'
        placeholder='0,00'
        value={value}
      />

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900 ">
          <CrossCircledIcon />
          <span className=" text-sm ">{error}</span>
        </div>
      )}
    </div>
  )
}
