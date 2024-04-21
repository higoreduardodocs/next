import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

import useMovieList from '@/hooks/use-movie-list'
import useFavorites from '@/hooks/use-favorites'
import useModal from '@/hooks/use-modal'
import Modal from '@/components/ui/modal'
import Navbar from '@/components/navigation/navbar'
import Billboard from '@/components/ui/billboard'
import ListMovie from '@/components/ui/list-movie'

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
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()

  return (
    <main className="pb-60">
      <Modal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <ListMovie title="Treding Now" data={movies} />
      <ListMovie title="My List" data={favorites} />
    </main>
  )
}
