import { TodoProvider } from '@/context/Todo'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-do list',
  description: 'To-do list',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <TodoProvider>
        <body className={inter.className}>
          {children}
          <ToastContainer theme="colored" />
        </body>
      </TodoProvider>
    </html>
  )
}
