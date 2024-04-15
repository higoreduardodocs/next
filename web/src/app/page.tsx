import DefaultLayout from '@/layouts/default-layout'
import FilterBar from '@/components/filter-bar'
import ProductList from '@/components/product-list'
import Pagination from '@/components/pagination'

export default function Home() {
  return (
    <DefaultLayout>
      <FilterBar />
      <ProductList />
      <Pagination />
    </DefaultLayout>
  )
}
