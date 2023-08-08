
import { ExitIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../app/hooks/useAuth';
import { DropdownMenu } from './DropdownMenu';

export default function UserMenu() {
  const {signout, user} = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
          <span className="text-sm text-teal-900 font-medium tracking-[-0.5px]">
            {user?.name.slice(0,2).toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className='w-28'>
          <DropdownMenu.Item onSelect={signout}>
            Sair
            <ExitIcon className='w-4 h-4' />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
