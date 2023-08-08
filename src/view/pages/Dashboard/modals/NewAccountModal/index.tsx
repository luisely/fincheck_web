import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorDropdown } from "../../../../components/ColorDropdown";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";


export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    handleSubmit,
    register,
    errors,
    control,
    isLoading
  } = useNewAccountModalController()

  return (
    <Modal title="Nova Conta" open={isNewAccountModalOpen} onClose={closeNewAccountModal}>

      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-tight">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-tight">R$</span>
            <Controller 
              control={control}
              name="initialBalance"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({field: { onChange, value }}) => (
              <Select 
                placeholder="Tipo"
                onChange={onChange}
                value={value}
                error={errors.type?.message}
                options={[
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos'
                  },
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente'
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Fisico'
                  }
                ]} 
              />
            )}
          />

          <Controller 
            control={control}
            name="color"
            defaultValue=""
            render={({field: { onChange, value }}) => (
              <ColorDropdown
                onChange={onChange}
                value={value}
                error={errors.color?.message}
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
