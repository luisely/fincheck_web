import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";

const schema = z.object({
  value: z.union([
    z.string().nonempty('Valor é obrigatório'),
    z.number()
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe o Banco'),
  date: z.date()
})

type FormData = z.infer<typeof schema>


export function useEditTrasactionModalController(transaction: Transaction | null, onClose: () => void) {

    const { 
    register, 
    handleSubmit: hookFormSubmit, 
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:{
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date()
    }
  })

  const queryClient = useQueryClient()
  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const {
    isLoading,
    mutateAsync: updateTransaction
  } = useMutation(transactionsService.update)

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeTransaction
  } = useMutation(transactionsService.remove)
  
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString()
      })
      
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success(
        transaction?.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      )
      onClose()
    } catch {
      toast.error(
        transaction?.type === 'EXPENSE'
          ? 'Erro ao salvar a despesa!'
          : 'Erro ao salvar a receita!'
      )
    }
  })


  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  async function hadleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id)
      
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Transação foi excluída com sucesso!')
      onClose()
    } catch {
      toast.error('Erro ao deletar transação!')
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }


  return {
    control,
    register,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    hadleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal
  }
}
