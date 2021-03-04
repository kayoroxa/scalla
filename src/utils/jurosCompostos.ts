export default function jurosCompostos(
  initial: number,
  multiplicador: number,
  time: number
) {
  return initial * (1 + multiplicador / 100) ** time
}
