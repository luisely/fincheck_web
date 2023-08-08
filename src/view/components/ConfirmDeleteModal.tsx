import { TrashIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmDeleteModalProps {
  onConfirm(): void
  onClose(): void
  title: string
  description?: string
  isLoading: boolean
}


export default function ConfirmDeleteModal({ onConfirm, onClose , title, description, isLoading}: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excuir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="font-bold w-[186px] text-gray-900 tracking-tight">{title}</p>

        {description && (
          <p className="tracking-tight text-gray-800 text-sm">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        
        <Button
          className="w-full"
          design="danger"
          onClick={onConfirm}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Sim, desejo excluir!
        </Button>

        <Button
          className="bg-white-900 w-full text-black"
          design="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}
