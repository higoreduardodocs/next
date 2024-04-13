export const getToday = () => Intl.DateTimeFormat('pt-br').format(new Date())

export const createToken = () => {
  const currentPassword = getToday().split('/').join('')
  return `${process.env.DEFAULT_TOKEN}${currentPassword}`
}

export const validateToken = (token: string) => {
  const currentToken = createToken()
  return token === currentToken
}

export const validatePassword = (password: string) => {
  const currentPassword = getToday().split('/').join('')
  return password === currentPassword
}

export const encryptMatch = (id: number): string =>
  `${process.env.DEFAULT_TOKEN}${id}${process.env.DEFAULT_TOKEN}`

export const decryptMatch = (match: string): number => {
  let idString = match
    .replace(process.env.DEFAULT_TOKEN as string, '')
    .replace(process.env.DEFAULT_TOKEN as string, '')

  return parseInt(idString)
}
