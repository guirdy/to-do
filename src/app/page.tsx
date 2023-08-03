import { Form } from '@/components/Form'
import { Header } from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="bg-dark-500 min-h-screen">
      <Header />
      <Form />
    </main>
  )
}
