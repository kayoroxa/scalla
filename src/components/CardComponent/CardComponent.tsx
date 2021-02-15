import React, { useEffect, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { TextField } from '@material-ui/core'
import calcNextTodo from '../../utils/calcNextToDo'
import ReactInterval from 'react-interval'
import { _useStoreActions, _useStoreState } from 'src/store/index.store'
import { ThumbUp } from '@material-ui/icons'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
})

interface IProps {
  imageUrl?: string
  title: string
  historicDays: { data: string; feito: number }[]
  multiplicador: number
  type: 'repetition' | 'timer'
  initialToDo: number
  index: number
  Audio?: HTMLAudioElement | undefined | null
}

export default function CardComponent({
  imageUrl,
  title,
  historicDays,
  multiplicador,
  type,
  initialToDo,
  index,
  Audio,
}: IProps) {
  const classes = useStyles()
  // const { habits } = _useStoreState(state => state)
  const { didToday, changeHabit } = _useStoreActions(actions => actions)

  // const [doToday, setDoToday] = useState(2)

  const nextToDo = useMemo(() => {
    const filtrado = historicDays.filter(value => value.feito !== 0)
    const nextToDo =
      filtrado.length > 0
        ? calcNextTodo(historicDays.slice(-1)[0].feito, multiplicador)
        : initialToDo
    return nextToDo
  }, [historicDays])

  // useEffect(() => {
  //   console.log({ nextToDo })
  // }, [nextToDo])

  const [faltantes, setFaltantes] = useState(nextToDo)
  const [isInterval, setIsInterval] = useState(false)
  const [hojeFeito, setHojeFeito] = useState(false)

  useEffect(() => {
    if (historicDays.slice(-1)[0]?.data === new Date().toLocaleDateString()) {
      setIsInterval(false)
      setHojeFeito(true)
    }
    // else {
    // setFaltantes(nextToDo)
    // setHojeFeito(false)
    // }
  }, [historicDays])

  useEffect(() => {
    if (faltantes <= 0) {
      didToday({ index, didToday: nextToDo })
      Audio?.play()
    }
  }, [faltantes])

  const router = useRouter()
  useEffect(() => {
    // !hojeFeito && setFaltantes(nextToDo)
  }, [nextToDo])

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => router.push(`habit/${index}`)}>
        <div style={{ position: 'absolute' }}>
          {!hojeFeito && type === 'timer' && faltantes}
        </div>
        <ReactInterval
          timeout={200}
          enabled={isInterval}
          callback={() => {
            // diminuirNextToDo({ index, decrease: 200 / 1000 })
            !hojeFeito && setFaltantes(prev => Math.max(0, prev - 200 / 1000))
          }}
        />
        <CardMedia
          component="img"
          alt={title}
          height="140"
          width="20"
          image={imageUrl}
          title={title}
        />
        <CardContent>
          <Typography align="center" variant="h5" component="h2">
            {title}
          </Typography>

          {/* <ValueCircle value={[]} /> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* {hojeFeito && feito} */}
        {!hojeFeito && type === 'timer' && (
          <>
            <Button
              onClick={() => setIsInterval(true)}
              size="small"
              color="primary"
              disabled={isInterval ? true : false}
            >
              Iniciar
            </Button>

            <Button
              onClick={() => setIsInterval(false)}
              size="small"
              color="primary"
              disabled={!hojeFeito && isInterval ? false : true}
            >
              Pausar
            </Button>
          </>
        )}
        {!hojeFeito && type === 'repetition' && (
          <Button
            onClick={() => didToday({ index, didToday: nextToDo })}
            size="small"
            color="primary"
          >
            done
          </Button>
        )}
        <TextField
          id="outlined-number"
          label="Fazer"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={nextToDo}
          onChange={(event: any) =>
            changeHabit({ index, nextToDo: Number(event.target.value) })
          }
          variant="outlined"
        />
        {hojeFeito && <ThumbUp color="primary" />}
      </CardActions>
    </Card>
  )
}
