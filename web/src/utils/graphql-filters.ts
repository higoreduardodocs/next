import { FilterPriorityType, FilterType } from '@/types/filter-type'

export function getCategoryByType(type: FilterType) {
  if (type === FilterType.MUG) return 'mugs'
  if (type === FilterType.SHIRT) return 't-shirts'
  return ''
}

export function getFieldByPriority(priority: FilterPriorityType) {
  if (priority === FilterPriorityType.NEWS)
    return { field: 'created_at', order: 'ASC' }
  if (priority === FilterPriorityType.BIGGEST_PRICE)
    return { field: 'price_in_cents', order: 'ASC' }
  if (priority === FilterPriorityType.MINOR_PRICE)
    return { field: 'price_in_cents', order: 'DSC' }
  return { field: 'sales', order: 'DSC' }
}

export default function mountQuery(
  type: FilterType,
  priority: FilterPriorityType,
  page: number,
  perPage: number
) {
  const typeFilter = getCategoryByType(type)
  const priorityFilter = getFieldByPriority(priority)

  if (type === FilterType.ALL && priority === FilterPriorityType.NEWS)
    return `
      query {
        allProducts (sortField: "sales", sortOrder: "DSC", page: ${page}, perPage: ${perPage}) {
          id, name, image_url, price_in_cents
        },
        count: allProducts (sortField: "sales", sortOrder: "DSC") {
          id
        }
      }
    `
  return `
    query {
      allProducts(sortField: "${priorityFilter.field}", sortOrder: "${
    priorityFilter.order
  }", ${
    typeFilter ? `filter: { category: "${typeFilter}"}` : ''
  }, page: ${page}, perPage: ${perPage}) {
        id, name, image_url, price_in_cents
      },
      count: allProducts (sortField: "${priorityFilter.field}", sortOrder: "${
    priorityFilter.order
  }", ${typeFilter ? `filter: { category: "${typeFilter}"}` : ''}) {
        id
      }
    }
  `
}
