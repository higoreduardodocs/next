import { useSession } from 'next-auth/react'

import Auth from '@/widgets/auth'

export default function Layout({ children }) {
  const { data: session } = useSession()

  if (!session) return <Auth />

  return <section className="min-h-screen bg-blue-900 flex">{children}</section>
}
