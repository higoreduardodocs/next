import { signIn } from 'next-auth/react'

export default function Auth() {
  return (
    <section className="flex items-center bg-blue-900 w-screen h-screen">
      <div className="text-center w-full">
        <button
          onClick={() => signIn('google')}
          className="p-2 px-4 bg-white rounded-lg"
        >
          Login with Google
        </button>
      </div>
    </section>
  )
}
