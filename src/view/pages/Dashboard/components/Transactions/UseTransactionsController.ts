import { useEffect, useMemo, useState } from "react";
import useDashboard from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function UseTransactionsController() {
  const { areValuesVisible } = useDashboard()

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [transactionToBeEdited, setTransactionToBeEdited] = useState<null | Transaction>(null)

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

  const {
    transactions,
    isLoading,
    isInitialLoading,
    refetch
  } = useTransactions(filters)

  useEffect(() => {
    refetch()
  }, [filters, refetch])

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  const totalSpend = useMemo(() => {
    const expenses = transactions.filter(transaction => transaction.type !== 'INCOME')

    return expenses.reduce((total, transaction) => total + transaction.value, 0)
  }, [transactions])

  const totalIncome = useMemo(() => {
    const incomes = transactions.filter(transaction => transaction.type !== 'EXPENSE')

    return incomes.reduce((total, transaction) => total + transaction.value, 0)
  }, [transactions])

  interface handleApplyFiltersProps {
    bankAccountId: string | undefined, 
    year: number
  }

  function handleApplyFilters({ bankAccountId, year }: handleApplyFiltersProps) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    setIsFilterModalOpen(false)
  } 

  function handleOpenFiltersModal(){
    setIsFilterModalOpen(true)
  }

  function handleCloseFiltersModal(){
    setIsFilterModalOpen(false)
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true)
    setTransactionToBeEdited(transaction)
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false)
    setTransactionToBeEdited(null)
  }

  return {
    areValuesVisible, 
    transactions,
    isInitialLoading,
    isLoading,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFilterModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    transactionToBeEdited,
    isEditModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    totalSpend,
    totalIncome
  }
}
