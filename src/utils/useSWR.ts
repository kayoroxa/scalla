import axios from 'axios'
import useSWR from 'swr'
const { NEXT_PUBLIC_URL } = process.env
const email = 'kayoroxa@gmail.com'

export function useHabit() {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  return useSWR(`${NEXT_PUBLIC_URL}/api/habits/${email}`, fetcher, {
    refreshInterval: 70000,
  })
}
