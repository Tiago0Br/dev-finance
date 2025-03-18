'use client'

import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

export function Summary() {
  return (
    <div className="w-full max-w-[1120px] mx-auto px-6 grid grid-cols-3 gap-8 -mt-20">
      <div className="bg-gray-600 rounded-md p-8">
        <header className="flex items-center justify-between text-gray-300">
          <span className="text-[0.9rem]">Entradas</span>
          <ArrowCircleUp size={32} className="text-green-300" />
        </header>

        <strong className="block mt-3.5 font-normal text-[2rem] leading-10">R$ 100,00</strong>
      </div>
      <div className="bg-gray-600 rounded-md p-8">
        <header className="flex items-center justify-between text-gray-300">
          <span className="text-[0.9rem]">Saídas</span>
          <ArrowCircleDown size={32} className="text-red-300" />
        </header>

        <strong className="block mt-3.5 font-normal text-[2rem] leading-10">R$ 40,00</strong>
      </div>
      <div
        data-variant="green"
        className="bg-gray-600 rounded-md p-8 data-[variant=green]:bg-green-700"
      >
        <header className="flex items-center justify-between text-gray-300">
          <span className="text-[0.9rem]">Total</span>
          <CurrencyDollar size={32} className="text-white" />
        </header>

        <strong className="block mt-3.5 font-normal text-[2rem] leading-10">R$ 60,00</strong>
      </div>
    </div>
  )
}
