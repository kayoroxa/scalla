import { IHabits } from './../utils/@types/habits.interface'
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
  lastDid?: { data: string; feito: number }[]
  nextToDo?: number
}

interface StoreModel {
  habits: IHabits[]
  createHabit: Action<StoreModel, any>
  didToday: Action<StoreModel, { index: number; didToday: number }>
  changeHabit: Action<StoreModel, IChangeHabitProps>
  deleteHabit: Action<StoreModel, { index: number }>
}

const imagesUrls = {
  meditation:
    'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2020/08/6-aplicativos-que-v%C3%A3o-ensinar-voc%C3%AA-a-praticar-medita%C3%A7%C3%A3o.jpg',
  flexão:
    'https://www.elhombre.com.br/wp-content/uploads/2018/04/flex%C3%A3o-bra%C3%A7o.jpg',
}

const store = createStore<StoreModel>(
  persist({
    habits: [
      {
        type: 'timer',
        title: 'Meditação',
        imageUrl: imagesUrls.meditation,
        historicDays: [],
        teste: [],
        multiplicador: 0.01,
        initialToDo: 60,
      },
      {
        type: 'repetition',
        title: 'flexão',
        imageUrl: imagesUrls.flexão,
        historicDays: [],
        multiplicador: 0.01,
        initialToDo: 1,
      },
    ],
    createHabit: action((state, payload: IHabits) => {
      state.habits.push({
        title: payload.title,
        type: payload.type,
        multiplicador: payload.multiplicador,
        imageUrl: payload.imageUrl,
        historicDays: payload.historicDays,
        initialToDo: payload.initialToDo,
      })
    }),
    deleteHabit: action((state, payload) => {
      state.habits.splice(payload.index, 1)
    }),
    didToday: action((state, payload) => {
      state.habits[payload.index].historicDays.push({
        data: new Date().toLocaleDateString(),
        feito: payload.didToday,
      })
    }),
    changeHabit: action((state, payload) => {
      state.habits[payload.index] = {
        ...state.habits[payload.index],
        ...payload,
      }
    }),
  })
)

const typedHooks = createTypedHooks<StoreModel>()

export const _useStoreActions = typedHooks.useStoreActions
export const _useStoreDispatch = typedHooks.useStoreDispatch
export const _useStoreState = typedHooks.useStoreState
export const _useStore = typedHooks.useStore

export default store
