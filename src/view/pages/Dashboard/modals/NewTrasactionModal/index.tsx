import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { DatePickerInput } from "../../components/DatePickerInput";
import { useNewTrasactionModalController } from "./useNewTrasactionModalController";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    register,
    handleSubmit,
    accounts,
    categories,
    isLoading
  } = useNewTrasactionModalController()

  const isExpense = newTransactionType === 'EXPENSE'

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-tight">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-tight">R$</span>
            <Controller 
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller 
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
                placeholder="Categoria" 
                options={categories.map(category => ({
                  label: category.name,
                  value: category.id
                }))} 
              />
            )}
          />

          <Controller 
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select 
                placeholder={isExpense ? 'Pagar com' : 'Receber com'} 
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))} 
              />
            )}
          />

          <Controller 
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  )
}
