import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'src/utils/mongodb'

export default async function habitsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req
    switch (method) {
      case 'POST':
        const { email, index } = req.query
        const { db }: { db: Db } = await connectToDatabase()
        await db.collection('user').updateOne(
          { email },
          {
            $unset: { [`habits.${index}`]: 1 },
          }
        )
        await db.collection('user').updateOne(
          { email },
          {
            $pull: { habits: null },
          }
        )
        res.status(200).json({ message: `habito index:${index} apagado` })
        return
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message })
  }
}
