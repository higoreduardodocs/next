import { useCallback } from 'react'

import useBillboard from '@/hooks/use-billboard'
import useModal from '@/hooks/use-modal'
import ButtonPlay from './button-play'
import ButtonInfo from './button-info'

const Billboard = () => {
  const { data } = useBillboard()
  const { openModal } = useModal()

  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data])

  return (
    <section className="relative sm:h-[56.25vw] h-[100vw]">
      <video
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        autoPlay
        muted
        loop
        className="
          w-full sm:h-[56.25vw] h-[100vw]
          object-cover brightness-[60%]
          transition duration-500
        "
      ></video>

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="
          h-full w-1/2
          font-bold text-white text-1xl md:text-5xl lg:text-6xl
          drop-shadow-xl
        "
        >
          {data?.title}
        </p>
        <p
          className="
          w-[50%]
          text-white text-[12px] md:text-lg
          mt-3 md:mt-8
          drop-shadow-xl
        "
        >
          {data?.description}
        </p>

        <div className="flex flex-row items-center gap-3 mt-3">
          <ButtonPlay movieId={data?.id} />
          <ButtonInfo title="More Info" onClick={handleOpenModal} />
        </div>
      </div>
    </section>
  )
}
export default Billboard
