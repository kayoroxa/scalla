const { NEXT_PUBLIC_URL } = process.env
import axios from 'axios'
const email = 'kayoroxa@gmail.com'

const get = async (url: string = ''): Promise<any> => {
  const response = await axios.get(
    `${NEXT_PUBLIC_URL}/api/habits/${email}/${url}`
  )
  return response.data
}

const post = async (url: string, post: any): Promise<any> => {
  const response = await axios.post(`/api/habits/${email}/${url}`, post)
  return response.data
}

const del = async (url: string): Promise<any> => {
  const response = await axios.delete(`/api/habits/${email}/${url}`)
  return response.data
}

const DB = {
  get,
  post,
  del,
}

export default DB
