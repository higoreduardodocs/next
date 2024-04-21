/* eslint-disable @next/next/no-img-element */
'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import axios from 'axios'

import Input from '@/components/input'

export default function Auth() {
  const router = useRouter()

  const [variant, setVariant] = useState('login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])
  const signInCredentail = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router])
  const signUpCredential = useCallback(async () => {
    try {
      await axios.post('/api/sign-up', {
        name,
        email,
        password,
      })
      signInCredentail()
    } catch (error) {
      console.log(error)
    }
  }, [name, email, password, signInCredentail])

  return (
    <section
      className="
    relative min-h-screen w-full
    bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover
    "
    >
      <div className="w-full min-h-screen bg-black bg-opacity-50">
        <nav className="px-12 py-5 md:block flex justify-center">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>

        <div className="flex justify-center">
          <div
            className="
            bg-black bg-opacity-70
            md:px-16 px-8 py-16 lg:mx-auto mt-2 mx-2 w-full lg:w-2/5
          "
          >
            <h2 className="font-semibold text-white text-4xl mb-8">
              {variant === 'login' ? 'Login' : 'Register'}
            </h2>

            <div className="flex flex-col gap-4">
              {variant !== 'login' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(ev: any) => setName(ev.target.value)}
                />
              )}

              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(ev: any) => setEmail(ev.target.value)}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(ev: any) => setPassword(ev.target.value)}
              />

              <button
                type="button"
                onClick={
                  variant === 'login' ? signInCredentail : signUpCredential
                }
                className="
                  text-white
                  w-full bg-red-600 py-3 mt-10 hover:bg-red-700
                  transition-all duration-300 ease-in-out
                "
              >
                {variant === 'login' ? 'Login' : 'Sign Up'}
              </button>

              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <button
                  type="button"
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className="
                    flex items-center justify-center
                    w-10 h-10 bg-white
                    rounded-full cursor-pointer hover:opacity-80
                    transition-all duration-300 ease-in-out
                  "
                >
                  <FcGoogle size={32} />
                </button>
                <button
                  type="button"
                  onClick={() => signIn('github', { callbackUrl: '/' })}
                  className="
                    flex items-center justify-center
                    w-10 h-10 bg-white
                    rounded-full cursor-pointer hover:opacity-80
                    transition-all duration-300 ease-in-out
                  "
                >
                  <FaGithub size={32} />
                </button>
              </div>

              <div className="flex md:flex-row flex-col items-center gap-4 mt-8 justify-center">
                <p className="text-neutral-500">
                  {variant === 'login'
                    ? 'First time using Netflix?'
                    : 'Already have an account?'}
                </p>
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
