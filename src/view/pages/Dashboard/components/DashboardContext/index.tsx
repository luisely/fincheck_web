import { createContext, useCallback, useState } from "react"
import { BankAccount } from "../../../../../app/entities/BankAccounts"

interface DashboardContextProps {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  toggleValueVisible(): void
  openNewAccountModal(): void
  closeNewAccountModal(): void
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void
  closeNewTransactionModal(): void
  isEditAccountModalOpen: boolean
  accountToBeEdited: null | BankAccount
  openEditAccountModal(bankAccount: BankAccount): void
  closeEditAccountModal(): void
}

interface DashboardProviderProps {
  children: React.ReactNode
}

export const DashboardContext = createContext({} as DashboardContextProps)

export function DashboardProvider({children}: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(false)
  const [isNewAccountModalOpen, setIsNewAccountModalOPen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)
  const [isEditAccountModalOpen, setIsEditAccountModalOPen] = useState(false)
  const [accountToBeEdited, setAccountToBeEdited] = useState<null | BankAccount>(null)

  const toggleValueVisible = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, [])

  
  // ACCOUNS MODALS STATES
  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOPen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => { 
    setIsNewAccountModalOPen(false)
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountToBeEdited(bankAccount)
    setIsEditAccountModalOPen(true)
  }, [])

  const closeEditAccountModal = useCallback(() => { 
    setAccountToBeEdited(null)
    setIsEditAccountModalOPen(false)
  }, [])

  // TRANSACTIONS MODALS STATES
  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, [])

  const closeNewTransactionModal = useCallback(() => { 
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  return (
    <DashboardContext.Provider value={{
      areValuesVisible,
      toggleValueVisible,
      openNewAccountModal,
      closeNewAccountModal,
      isNewAccountModalOpen,
      openNewTransactionModal,
      closeNewTransactionModal,
      isNewTransactionModalOpen,
      newTransactionType,
      isEditAccountModalOpen,
      closeEditAccountModal,
      openEditAccountModal,
      accountToBeEdited
    }}>
      {children}
    </DashboardContext.Provider>
  )
}
