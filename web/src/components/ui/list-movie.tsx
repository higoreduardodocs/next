import { MovieInterface } from '@/types/movies'
import CardMovie from './card-movie'

type Props = {
  data: MovieInterface[]
  title: string
}

const ListMovie: React.FC<Props> = ({ data, title }) => {
  return (
    <section className="px-4 md:px-12 mt-4 space-y-8">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {data?.length > 0 &&
          data.map((item) => <CardMovie key={item.id} data={item} />)}
      </div>
    </section>
  )
}
export default ListMovie
