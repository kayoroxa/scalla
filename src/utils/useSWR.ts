import { _useStoreState } from './../store/index.store'
import axios from 'axios'
import useSWR from 'swr'
// const { NEXT_PUBLIC_URL } = process.env
// const email = 'kayoroxa@gmail.com'

export function useHabit() {
  // const email = localStorage.getItem('email')
  const { email } = _useStoreState(state => state)
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  return useSWR(`/api/habits/${email}`, fetcher, {
    refreshInterval: 50000,
  })
}
export function useDataUser() {
  // const email = localStorage.getItem('email')
  const { email } = _useStoreState(state => state)
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  return useSWR(`/api/user-data/${email}`, fetcher, {
    refreshInterval: 50000,
  })
}
