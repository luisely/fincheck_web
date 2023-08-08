import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModalController } from "./useFiltersModalController";

interface FiltersModalProps {
  open: boolean
  onClose?: () => void;
  onApplyFilters(filters: { bankAccountId: string | undefined, year: number}): void
}

export function FiltersModal({open, onClose, onApplyFilters}: FiltersModalProps){
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts
  } = useFiltersModalController()

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className='text-lg font-bold tracking-tight text-gray-800'>Conta</span> 

        <div className="flex flex-col space-y-2 mt-2">
          {accounts.map((account) => {
            const isSelected = account.id === selectedBankAccountId

            return (
              <button
                data-active={isSelected}
                onClick={() => handleSelectBankAccount(account.id)}
                key={account.id}
                className='p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-100 data-[active=true]:bg-gray-200'>
                  {account.name}
              </button>
            )
          })}
          
        </div>

      </div>

      <div className="mt-10 text-gray-800">
        <span className='text-lg font-bold tracking-tight'>Ano</span> 

        <div className="mt-2 w-52 flex items-center justify-between">
          <button 
            onClick={() => handleChangeYear(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center items-center ">
            <span className="text-sm font-medium tracking-tight">{selectedYear}</span>
          </div>

          <button 
            onClick={() => handleChangeYear(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() => onApplyFilters({ 
          bankAccountId: selectedBankAccountId,
          year: selectedYear
        })}> 
          Aplicar Filtros
      </Button>
    </Modal>
  )
}