// import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from 'src/utils/mongodb'

export default async function habitsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req
    switch (method) {
      case 'GET':
        // const { email } = req.query
        // const { db }: { db: Db } = await connectToDatabase()
        // const data = await db.collection('user').findOne({ email })
        res.status(200).json('cool')
        return
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message })
  }
}
