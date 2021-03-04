import { makeStyles, Typography } from '@material-ui/core'
import BackgroundTimer from 'background-timer'
import { useEffect, useState } from 'react'

interface IProps {
  Audio?: HTMLAudioElement | undefined | null
  isPlaying: boolean
  duration: number
  onEnded?: Function
}

export default function TimerComponent({
  Audio,
  isPlaying,
  duration,
  onEnded,
}: IProps) {
  const [remaining, setRemaining] = useState<string>('')
  const [alreadyPlay, setAlreadyPlay] = useState(false)

  const Timer = new BackgroundTimer(duration * 1000, {
    tickCallback: remaining => {
      setRemaining(remaining)
    },
    finishCallback: () => {
      Audio?.play()
      onEnded && onEnded()
    },
  })

  useEffect(() => {
    if (alreadyPlay) {
      if (isPlaying) {
        Timer.resumeTicking()
      } else {
        Timer.pauseTicking()
      }
    } else if (isPlaying) {
      Timer.start()
      setAlreadyPlay(true)
    }
  }, [isPlaying])

  const classes = useStyles()
  return (
    <div style={{ opacity: isPlaying ? 1 : 0 }} className={classes.timerCircle}>
      <Typography align="center" variant="h5" component="h2">
        {remaining}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles({
  timerCircle: {
    background: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
})
