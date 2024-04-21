import { RiInformationLine } from 'react-icons/ri'

type Props = {
  title: string
  onClick: any
}

const ButtonInfo: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex flex-row items-center
        w-auto
        font-semibold text-white text-xs lg:text-lg
        bg-white bg-opacity-30 hover:bg-opacity-20
        rounded-md py-1 md:py-2 px-2 md:px-4
        transition
      "
    >
      <RiInformationLine size={20} className="w-4 md:w-7 mr-1" />
      {title}
    </button>
  )
}
export default ButtonInfo
