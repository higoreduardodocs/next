import { useRouter } from 'next/router'
import { BsFillPlayFill } from 'react-icons/bs'

type Props = {
  movieId: string
}

const ButtonPlay: React.FC<Props> = ({ movieId }) => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        flex justify-center items-center
        w-8 h-8 lg:w-10 lg:h-10
        bg-white rounded-full
        transition hover:bg-neutral-300
        cursor-pointer
      "
    >
      <BsFillPlayFill size={20} />
    </button>
  )
}
export default ButtonPlay
