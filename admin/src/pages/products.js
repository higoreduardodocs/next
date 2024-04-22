import { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2'
import axios from 'axios'

import FormProduct from '@/components/forms/product'
import Spinner from '@/components/icons/spinner'
import Pencil from '@/components/icons/pencil'
import Trash from '@/components/icons/trash'

function Products({ swal }) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productForm, setProductForm] = useState(false)
  const [product, setProduct] = useState(null)

  const editProduct = (item) => {
    item.properties =
      item.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      })) ?? []

    setProduct(item)
    setProductForm(true)
  }
  const removeProduct = async (item) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: `You want delete the "${item.title}"`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (res) => {
        if (res.isConfirmed) {
          setLoading(true)

          try {
            const { _id } = item
            await axios.delete(`/api/products?id=${_id}`)

            toast.success('Deleted Successful', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            })
            getProducts()
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }
      })
  }
  const getProducts = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/products')
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const getCategories = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/categories')
      setCategories(data?.categories)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getProducts()
    getCategories()
  }, [])

  return (
    <main>
      <div className="flex justify-between items-center">
        <h1>Products</h1>
        {!productForm && (
          <button
            type="button"
            onClick={() => {
              setProductForm(true)
            }}
            className="btn-primary"
          >
            Add new product
          </button>
        )}
      </div>

      {productForm && (
        <FormProduct
          {...product}
          setProductForm={setProductForm}
          getProducts={getProducts}
          categories={categories}
          setProduct={setProduct}
        />
      )}

      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner />
          <span>Loading...</span>
        </div>
      ) : products?.length > 0 ? (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Product name</td>
              <td>Category name</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {products.map((item, i) => (
              <tr key={i}>
                <td>{item.title}</td>
                <td>{item?.category?.name}</td>
                <td className="flex flex-end items-center gap-1">
                  <button
                    onClick={() => editProduct(item)}
                    className="btn-primary"
                  >
                    <Pencil />
                    Edit
                  </button>

                  <button
                    onClick={() => removeProduct(item)}
                    className="btn-red"
                  >
                    <Trash />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No products founded</h2>
      )}
    </main>
  )
}
export default withSwal(({ swal }, ref) => <Products swal={swal} />)
