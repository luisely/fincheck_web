import { useState } from "react";

export function ValidNumber() {
  const [value, setValue] = useState<number | null>(null)

  function handleChange(minNumber = 10, maxNumber = 23, value: number, numbers?: Array<number>) {
    if(!numbers && (value >= minNumber && value <= maxNumber)) {
      setValue(value)
    }

    if (value > 0 && value < maxNumber) {
      setValue(value)
    }

    if (value < 0 || value < minNumber ){
      setValue(numbers![0])
    }

    if (value > maxNumber){
      setValue(numbers![numbers!.length -1])
    }
  }


  return { handleChange, value}

}