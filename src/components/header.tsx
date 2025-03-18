import Image from 'next/image'
import logo from '@/assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'

export function Header() {
  return (
    <header className="bg-gray-900 pt-[2.5rem] pb-[7.5rem]">
      <div className="w-full max-w-[1120px] mx-auto px-[1.5rem] flex items-center justify-between">
        <Image src={logo} alt="" draggable={false} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="h-[50px] border-0 bg-green-500 font-bold px-[1.25rem] rounded-md cursor-pointer text-white hover:bg-green-700 transition-colors text-sm">
              Nova transação
            </button>
          </Dialog.Trigger>
        </Dialog.Root>
      </div>
    </header>
  )
}
