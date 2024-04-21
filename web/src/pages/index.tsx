import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

import useModal from '@/hooks/use-modal'
import Modal from '@/components/ui/modal'
import Navbar from '@/components/navigation/navbar'
import Billboard from '@/components/ui/billboard'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const { isOpen, closeModal } = useModal()

  return (
    <main className="pb-60">
      <Modal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
    </main>
  )
}
