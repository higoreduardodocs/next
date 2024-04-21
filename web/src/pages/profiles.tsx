import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

import useCurrentUser from '@/hooks/use-current-user'
import UserCard from '@/components/ui/user-card'

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

export default function Profiles() {
  const router = useRouter()
  const { data } = useCurrentUser()

  const selectProfile = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <main className="flex items-center min-h-screen justify-center">
      <div className="flex flex-col gap-8">
        <h1 className="text-white text-3xl md:text-6xl text-center">
          Who&#39;s watching?
        </h1>

        <div className="flex items-center justify-center gap-8 mt-10">
          <UserCard name={data?.currentUser?.name} onClick={selectProfile} />
        </div>
      </div>
    </main>
  )
}
