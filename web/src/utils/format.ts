export function formatPrice(value: number) {
  const formattedValue = value / 100
  return formattedValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
