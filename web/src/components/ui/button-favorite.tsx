import { useCallback, useMemo } from 'react'
import { BiPlus, BiCheck } from 'react-icons/bi'

import useCurrentUser from '@/hooks/use-current-user'
import useFavorites from '@/hooks/use-favorites'
import axios from 'axios'

type Props = {
  movieId: string
}

const ButtonFavorite: React.FC<Props> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: user, mutate } = useCurrentUser()
  console.log(user)
  const isFavorite = useMemo(() => {
    const favoriteMovies = user?.currentUser?.favoriteIds || []
    return favoriteMovies.includes(movieId)
  }, [user, movieId])
  const toggleFavorite = useCallback(async () => {
    const endpoint = `/api/favorite/${movieId}`
    let response = isFavorite
      ? await axios.delete(endpoint)
      : await axios.post(endpoint)

    const updatedFavoriteIds = response?.data?.favoriteIds
    mutate({
      currentUser: {
        ...user.currentUser,
        favoriteIds: updatedFavoriteIds,
      },
    })
    mutateFavorites()
  }, [isFavorite, movieId, mutate, user, mutateFavorites])

  const Icon = isFavorite ? BiCheck : BiPlus

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`
        flex justify-center items-center
        w-8 h-8 lg:w-10 lg:h-10
        group/item transition
        border-white border-2 rounded-full hover:border-neutral-300
        cursor-pointer
        ${isFavorite ? 'bg-white' : ''}
      `}
    >
      <Icon
        size={20}
        className={`
          w-4 lg:w-6
          ${
            isFavorite
              ? 'text-zinc-900 group-hover/item:text-zinc-600'
              : 'text-white group-hover/item:text-neutral-300'
          }
        
        `}
      />
    </button>
  )
}
export default ButtonFavorite
