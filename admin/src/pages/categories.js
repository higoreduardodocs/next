import { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2'
import { toast } from 'react-toastify'
import axios from 'axios'

import Spinner from '@/components/icons/spinner'
import FormCategory from '@/components/forms/category'
import Pencil from '@/components/icons/pencil'
import Trash from '@/components/icons/trash'

function Categories({ swal }) {
  const [categoryForm, setCategoryForm] = useState(false)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const editCategory = (item) => {
    item.properties =
      item.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      })) ?? []

    setCategory(item)
    setCategoryForm(true)
  }
  const removeCategory = async (item) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: `You want delete the "${item.name}"`,
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
            await axios.delete(`api/categories?id=${_id}`)
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
            getCategories()
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }
      })
  }
  const getCategories = async () => {
    setLoading(true)
    const { data } = await axios.get('/api/categories')
    setCategories(data?.categories)
    setLoading(false)
  }
  useEffect(() => {
    getCategories()
  }, [])

  return (
    <main>
      <div className="flex justify-between items-center">
        <h1>Categories</h1>
        {!categoryForm && (
          <button
            type="button"
            onClick={() => {
              setCategoryForm(true)
            }}
            className="btn-primary"
          >
            Add new category
          </button>
        )}
      </div>

      {categoryForm && (
        <FormCategory
          {...category}
          categories={categories}
          setCategoryForm={setCategoryForm}
          getCategories={getCategories}
          setCategory={setCategory}
        />
      )}

      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner />
          <span>Loading...</span>
        </div>
      ) : categories?.length > 0 ? (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent name</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {categories.map((item, i) => (
              <tr key={i} className="border-b border-blue-200">
                <td>{item.name}</td>
                <td>{item?.parent?.name ?? 'No parent'}</td>
                <td className="flex flex-end items-center gap-1">
                  <button
                    onClick={() => editCategory(item)}
                    className="btn-primary"
                  >
                    <Pencil />
                    Edit
                  </button>

                  <button
                    onClick={() => removeCategory(item)}
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
        <h2>No categories founded</h2>
      )}
    </main>
  )
}
export default withSwal(({ swal }, ref) => <Categories swal={swal} />)
