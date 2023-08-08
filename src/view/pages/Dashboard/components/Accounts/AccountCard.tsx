import { BankAccount } from "../../../../../app/entities/BankAccounts";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/BankAccountTypeIcon";
import useDashboard from "../DashboardContext/useDashboard";


interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { color, currentBalance, name, type  } = data

  const { areValuesVisible, openEditAccountModal } = useDashboard()

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-b-teal-950"
      style={ {borderBottomColor: color}}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span 
          data-visible={areValuesVisible} 
          className="text-gray-800 font-medium tracking-[-0.5px] data-[visible=true]:blur-sm block"
        >
          {!areValuesVisible ? formatCurrency(currentBalance) : 'NOT_VISIBLE'}
        </span>
        <small className="font-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  )
}
