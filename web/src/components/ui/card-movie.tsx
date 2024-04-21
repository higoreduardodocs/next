/* eslint-disable @next/next/no-img-element */

import { useCallback } from 'react'

import { MovieInterface } from '@/types/movies'
import useModal from '@/hooks/use-modal'
import ButtonPlay from './button-play'
import ButtonFavorite from './button-favorite'
import ButtonDetail from './button-detail'

type Props = {
  data: MovieInterface
}

const CardMovie: React.FC<Props> = ({ data }) => {
  const { openModal } = useModal()

  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data])

  return (
    <article className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.thumbnailUrl}
        alt={data.title}
        draggable={false}
        className="
        w-full h-[12vw]
        object-cover rounded-md shadow-xl
        cursor-pointer
        transition delay-300 duration-300 ease-in-out
        group-hover:opacity-90 sm:group-hover:opacity-0
        "
      />

      <div
        className="
        absolute top-0
        w-full
        invisible sm:visible
        scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-100
        group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw]
        transition delay-300 duration-200 ease-in-out
        z-10
      "
      >
        <img
          src={data.thumbnailUrl}
          alt={data.title}
          draggable={false}
          className="
            w-full h-[12vw]
            object-cover rounded-t-md shadow-xl
            transition duration 
          "
        />

        <div
          className="
          flex flex-col gap-2 p-2
          bg-zinc-900 border border-zinc-200 rounded-b-md
        "
        >
          <div className="flex flex-row items-center gap-2">
            <ButtonPlay movieId={data?.id} />
            <ButtonFavorite movieId={data?.id} />
            <ButtonDetail onClick={handleOpenModal} />
          </div>

          <p className="text-green-400 font-semibold text-sm">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex items-center justify-between">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
export default CardMovie
