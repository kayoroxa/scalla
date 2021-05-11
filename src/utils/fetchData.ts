import { _useStoreState } from 'src/store/index.store'
const { NEXT_PUBLIC_URL } = process.env
import axios from 'axios'

const get = async (url: string = ''): Promise<any> => {
  const { email } = _useStoreState(state => state)
  const response = await axios.get(
    `${NEXT_PUBLIC_URL}/api/habits/${email}/${url}`
  )
  return response.data
}

const post = async (url: string, post: any, email: string): Promise<any> => {
  // const { email } = _useStoreState(state => state)
  const response = await axios.post(`/api/habits/${email}/${url}`, post)
  return response.data
}

const del = async (url: string, email: string, index: number): Promise<any> => {
  // const { email } = _useStoreState(state => state)
  const response = await axios.post(`/api/habits/${email}/${url}/${index}`)
  return response.data
}

const DB = {
  get,
  post,
  del,
}

export default DB
