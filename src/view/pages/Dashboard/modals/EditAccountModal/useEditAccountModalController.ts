import { z } from "zod";
import useDashboard from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo Inicial é obrigatório'),
    z.number()
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CASH', 'INVESTMENT', 'CHECKING']),
  color: z.string().nonempty('Cor é obrigatória')
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountToBeEdited
  } = useDashboard()

  const { 
    register, 
    handleSubmit: hookFormSubmit, 
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountToBeEdited?.color,
      name: accountToBeEdited?.name,
      type: accountToBeEdited?.type,
      initialBalance: accountToBeEdited?.initialBalance
    } 
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const { isLoading, mutateAsync: updateAccount } = useMutation(bankAccountService.update)

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeAccount
  } = useMutation(bankAccountService.remove)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountToBeEdited!.id
      })
      
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta editada com sucesso!')
      closeEditAccountModal()
    } catch {
      toast.error('Erro ao salvar as alterações!')
    }
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  async function hadleDeleteAccount(){
    try {
      await removeAccount(accountToBeEdited!.id)
      
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta excluída com sucesso!')
      closeEditAccountModal()
    } catch {
      toast.error('Erro ao deletar a conta!')
    }
  }


  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    hadleDeleteAccount,
    isLoadingDelete
  }
}
