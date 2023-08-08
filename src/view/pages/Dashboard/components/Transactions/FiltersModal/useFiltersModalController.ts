import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

export function useFiltersModalController() {
  const [selectedBankAccountId, setSelectBankAccountId] = useState<undefined | string>(undefined)
  const [selectedYear, setSelectYear] = useState(new Date().getFullYear())

  const { accounts } = useBankAccounts()

  function handleSelectBankAccount(backAccountId: string){
    setSelectBankAccountId(prevState => (
      prevState === backAccountId ? undefined : backAccountId
    ))
  }

  function handleChangeYear(step: number) {
    setSelectYear(prevState => prevState + step)
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts
  }
}