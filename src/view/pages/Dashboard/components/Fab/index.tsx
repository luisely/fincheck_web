import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import useDashboard from "../DashboardContext/useDashboard";

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard()

  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="bg-teal-600 h-12 w-12 rounded-full text-white flex items-center justify-center z-[99]">
          <PlusIcon className="w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-48">
          <DropdownMenu.Item 
            className="gap-2 justify-start" 
            onSelect={() => openNewTransactionModal('EXPENSE')}
          >
            <CategoryIcon type='expense' />
            Nova Despesa
          </DropdownMenu.Item >
          <DropdownMenu.Item
            className="gap-2 justify-start" 
            onSelect={() => openNewTransactionModal('INCOME')}
          >
            <CategoryIcon type='income' />
            Nova Receita
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={openNewAccountModal} className="gap-2 justify-start">
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
    
  )
}