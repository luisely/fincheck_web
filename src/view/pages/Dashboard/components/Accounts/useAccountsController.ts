import { useMemo, useState } from "react"
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts"
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth"
import useDashboard from "../DashboardContext/useDashboard"

export default function useAccountsController() {
  const windowWidth = useWindowWidth()
  const {
    areValuesVisible,
    toggleValueVisible,
    openNewAccountModal
  } = useDashboard()

  const [sliderState, setSlideState] = useState({
    isBeginnig: true,
    isEnd: false
  })

  const { accounts, isFetching } = useBankAccounts()

  const totalCurrentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    setSlideState,
    windowWidth,
    areValuesVisible,
    toggleValueVisible,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    totalCurrentBalance
  }
}
