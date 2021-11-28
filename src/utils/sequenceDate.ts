interface IHistoryData {
  data: string
  feito: number
}

export default function (historyData: IHistoryData[]) {
  const onlyData = historyData.map(item => item.data)
  const onlyDataSorted = onlyData.reverse()
  const hoje = new Date().toLocaleDateString('pt-br')
  const diferenceToDay = dateStringDiference(onlyDataSorted[0], hoje)
  if (diferenceToDay > 2) return 0 //sem sequencia
  let stop = false
  const sequenceDay = onlyDataSorted.reduce((acc, curr, i) => {
    if (i === 0) return 0
    if (stop === true) return acc

    const diference = dateStringDiference(curr, onlyDataSorted[i - 1])
    if (diference === 1 || diference === 2) {
      const isLastData = i === onlyDataSorted.length - 1
      return isLastData ? acc + 2 : acc + 1
    }
    if (diference > 2) {
      stop = true
      return acc === 0 ? acc : acc + 1
    }
    //throw new Error('Erro na sequencia de dias')
    return acc
  }, 0)

  return sequenceDay
}

export function dateStringDiference(date1: any, date2: any) {
  const [day1, month1, year1] = date1.split('/')
  const [day2, month2, year2] = date2.split('/')
  const date1Date = new Date(year1, month1 - 1, day1)
  const date2Date = new Date(year2, month2 - 1, day2)
  const diff = date2Date.getTime() - date1Date.getTime()
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
  return diffDays
}
