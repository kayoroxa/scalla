import {
  Action,
  action,
  createStore,
  createTypedHooks,
  persist,
} from 'easy-peasy'

interface IChangeHabitProps {
  index: number
  name?: string
  multiplicador?: number
  initial?: number
  lastDid?: (number | null)[]
  nextToDo?: number
}

interface IHabits {
  name: string
  multiplicador: number
  initial: number
  lastDid: (number | null)[]
  nextToDo: number
}

interface StoreModel {
  habits: IHabits[]
  createHabit: Action<StoreModel, any>
  didToday: Action<StoreModel, { index: number; lastDid: number }>
  changeHabit: Action<StoreModel, IChangeHabitProps>
}

const store = createStore<StoreModel>({
  habits: persist([
    {
      name: 'meditar',
      multiplicador: 2,
      initial: 2,
      lastDid: [5, null, 9],
      nextToDo: 2,
    },
  ]),
  createHabit: action((state, payload) => {
    state.habits.push({
      name: payload.name,
      multiplicador: payload.multiplicador,
      initial: payload.initial,
      lastDid: [],
      nextToDo: payload.multiplicador,
    })
  }),
  didToday: action((state, payload) => {
    const habitSelect = state.habits[payload.index]
    const diasFeitos = habitSelect.lastDid.length
    habitSelect.lastDid.push(payload.lastDid)
    habitSelect.nextToDo = diasFeitos * 5
  }),
  changeHabit: action((state, payload) => {
    state.habits[payload.index] = { ...state.habits[payload.index], ...payload }
  }),
})

const typedHooks = createTypedHooks<StoreModel>()

export const _useStoreActions = typedHooks.useStoreActions
export const _useStoreDispatch = typedHooks.useStoreDispatch
export const _useStoreState = typedHooks.useStoreState
export const _useStore = typedHooks.useStore

export default store
