import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

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
  return (
    <main className="pb-60">
      <Navbar />
      <Billboard />
    </main>
  )
}
