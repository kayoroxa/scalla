import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'src/utils/mongodb'
import moment from 'moment'

export default async function habitsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req
    switch (method) {
      case 'POST':
        const { email } = req.query
        const { body } = req
        const { db }: { db: Db } = await connectToDatabase()

        const pathHistoric = `habits.${body.index}.historicDays`
        const pathInitialToDo = `habits.${body.index}.initialToDo`
        await db.collection('user').updateOne(
          { email },
          {
            $push: {
              [pathHistoric]: {
                data: moment().subtract(3, 'hours').format('DD/MM/YYYY'), //new Date().setHours(new Date().getHours() - 3), //.toLocaleDateString('pt-br'),
                feito: body.done,
              },
            },
            $set: {
              [pathInitialToDo]: body.nextToDo,
            },
          }
        )
        res.status(200).json({
          message: `SUCCESS ${new Date().toLocaleDateString(
            'pt-br'
          )} ${new Date()}`,
        })
        return
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message })
  }
}
