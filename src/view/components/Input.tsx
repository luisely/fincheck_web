import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { twMerge } from "tailwind-merge";


// import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<'input'> {
  name: string
  error?: string
  success?: boolean
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ name, id, placeholder, error, className, ...props}, ref) => {
  const inputId = id ?? name

  return (
    <div className="relative">
      {/* <input 
        {...props}
        ref={ref}
        name={name} 
        id={inputId} 
        className={cn("w-full h-[52px] rounded-lg border border-gray-400 bg-white px-3 text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none", error && '!border-red-900', className)}
        placeholder=" "
      /> */}
      

      <input 
        {...props}
        ref={ref}
        data-success={!!error}
        name={name} 
        id={inputId} 
        className={twMerge('w-full h-[52px] rounded-lg border border-gray-400 bg-white px-3 text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none data-[success=true]:!border-red-900', className)}
        placeholder=" "
      />

      <label 
        htmlFor={inputId} 
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
        {placeholder}
      </label>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900 ">
          <CrossCircledIcon />
          <span className=" text-sm ">{error}</span>
        </div>
      )}
    </div>
  )
})
Input.displayName = 'Input'
