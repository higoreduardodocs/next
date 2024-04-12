'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUpSchema, TSignUpSchema } from '@/types/types'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = async (values: TSignUpSchema) => {
    const response = await fetch('/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    if (data.errors) {
      const errors = data.errors

      if (errors.name) {
        setError('email', {
          type: 'server',
          message: errors.name,
        })
      } else if (errors.email) {
        setError('email', {
          type: 'server',
          message: errors.email,
        })
      } else if (errors.password) {
        setError('password', {
          type: 'server',
          message: errors.password,
        })
      } else if (errors.confirmPassword) {
        setError('confirmPassword', {
          type: 'server',
          message: errors.confirmPassword,
        })
      } else {
        alert('Something went wrong!')
      }
    } else {
      reset()
    }
  }

  const classNameInput =
    'text-sm w-full p-2 bg-transparent border border-gray-400 rounded-sm outline-none placeholder:text-gray-600'
  const classNameError = 'text-red-500 text-xs'

  return (
    <main
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center w-full h-[100vh] bg-black text-black"
    >
      <form className="flex flex-col gap-3 w-full max-w-lg p-6 rounded-sm border border-gray-200 shadow-md bg-white">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className={classNameInput}
          />
          {errors.name && (
            <p className={classNameError}>{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={classNameInput}
          />
          {errors.email && (
            <p className={classNameError}>{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={classNameInput}
          />
          {errors.password && (
            <p className={classNameError}>{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Confirm password"
            {...register('confirmPassword')}
            className={classNameInput}
          />
          {errors.confirmPassword && (
            <p className={classNameError}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white p-2 rounded-sm hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </main>
  )
}
