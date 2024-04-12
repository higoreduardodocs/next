import { NextResponse } from 'next/server'

import { signUpSchema } from '@/types/types'

export async function POST(request: Request) {
  const body: unknown = await request.json()
  const response = signUpSchema.safeParse(body)

  let zodErrors = {}
  if (!response.success) {
    response.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  )
}
