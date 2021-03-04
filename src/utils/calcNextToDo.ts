export default function calcNextTodo(
  // last10Days: { data: string; feito: number }[],
  lastNumber: number,
  multiplicador: number
) {
  // const lastNumber: number = last10Days.splice(-1)[0].feito
  if (lastNumber !== null) {
    const retornar = lastNumber + (lastNumber * multiplicador) / 100
    return retornar
  }
  throw new Error('NextTodo não conseguiu ser calculado')
}
