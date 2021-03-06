import { Box, Grid, makeStyles } from '@material-ui/core'
import { useStoreRehydrated } from 'easy-peasy'
import { useRef } from 'react'
import Layout from 'src/components/Layout'
import { _useStoreState } from 'src/store/index.store'
import { IHabits } from 'src/utils/@types/habits.interface'
import { useHabit, useDataUser } from 'src/utils/useSWR'
import CardComponent from '../components/CardComponent/CardComponent'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
  },
})

// interface IProps {
//   habits: IHabits[]
// }

// function Home({ habits }: IProps) {
function Home() {
  // if (typeof window === 'undefined') return <div>oi</div>
  const classes = useStyles()
  const isRehydrated = useStoreRehydrated()
  const refAudio = useRef<HTMLAudioElement>(null)

  const useImage = useDataUser().data?.userImage
  const { data } = useHabit()

  const habits: IHabits[] = data

  return (
    <div className={classes.root}>
      <audio ref={refAudio} src="alarm-curto.mp3"></audio>
      {isRehydrated && (
        <Layout useImage={useImage}>
          <Box p={2}>
            <Grid container spacing={4}>
              {habits &&
                Object.values(habits).map((habit, index) => (
                  <Grid key={index} item xl={3} lg={3} md={4} sm={6} xs={12}>
                    <CardComponent
                      index={index}
                      type={habit.type}
                      title={habit.title}
                      imageUrl={habit.imageUrl}
                      historicDays={habit.historicDays}
                      multiplicador={habit.multiplicador}
                      initialToDo={habit.initialToDo}
                      Audio={refAudio?.current}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Layout>
      )}
    </div>
  )
}

export default Home

// export async function getServerSideProps() {
//   // const habits = await DB.get()

//   const { data } = useDataUser()

//   return {
//     props: {
//       useImage: data.useImage,
//     },
//   }
// }
