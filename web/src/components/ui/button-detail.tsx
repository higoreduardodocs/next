import { BiChevronDown } from 'react-icons/bi'

type Props = {
  onClick: any
}

const ButtonDetail: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex justify-center items-center
        w-8 h-8 lg:w-10 lg:h-10
        group/item transition
        border-white border-2 rounded-full hover:border-neutral-300
        cursor-pointer
      "
    >
      <BiChevronDown
        size={20}
        className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
      />
    </button>
  )
}
export default ButtonDetail
