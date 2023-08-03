import React from 'react'
import Logo from '@/assets/logo.svg'
import Image from 'next/image'

export const Header = () => {
  return (
    <header className="bg-dark-900 flex justify-center w-full py-16">
      <Image src={Logo} alt="todo logo" className="w-26" />
    </header>
  )
}
