export interface ProductType {
  id: string
  name: string
  image_url: string
  price_in_cents: number
  category?: string
  description?: string
}

export interface ProductInCart extends ProductType {
  quantity: number
}

export interface ProductsFetchResponseType {
  data: { allProducts: ProductType[]; count: string[] }
}

export interface ProductFetchResponseType {
  data: { Product: ProductType }
}
