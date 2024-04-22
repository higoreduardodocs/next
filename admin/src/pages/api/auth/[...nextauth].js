import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import clientPromise from '@/libs/mongodb'

const adminEmails = ['bhigoreduardo@gmail.com']

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session }) => {
      if (adminEmails.includes(session?.user?.email)) return session
      return false
    },
  },
}
export default NextAuth(authOptions)
export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401)
    res.end()
    throw 'Not an admin'
  }
}
