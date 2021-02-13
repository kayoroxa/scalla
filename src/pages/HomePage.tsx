import { Box, Grid, makeStyles } from '@material-ui/core'
import { useStoreRehydrated } from 'easy-peasy'
import { useRef } from 'react'
import Layout from 'src/components/Layout'
import { _useStoreState } from 'src/store/index.store'
import CardComponent from '../components/CardComponent/CardComponent'

const useStyles = makeStyles({
  root: {
    // background: 'red',
    height: '100vh',
    width: '100vw',
  },
})

const HomePage = () => {
  const { habits } = _useStoreState(store => store)
  const classes = useStyles()
  const isRehydrated = useStoreRehydrated()
  const refAudio = useRef<HTMLAudioElement>(null)
  return (
    <div className={classes.root}>
      <audio ref={refAudio} src="alarm-curto.mp3"></audio>
      {isRehydrated && (
        <Layout>
          <Box p={2}>
            <Grid container spacing={4}>
              {Object.values(habits).map((habit, index) => (
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

export default HomePage
