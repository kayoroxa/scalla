export interface IHabits {
  title: string
  type: 'timer' | 'repetition'
  multiplicador: number
  imageUrl: string
  historicDays: { data: string; feito: number }[]
  initialToDo: number
  nextTodo?: number
}
