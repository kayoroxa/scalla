import { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import calcNextTodo from '../../utils/calcNextToDo'
import { _useStoreActions, _useStoreState } from 'src/store/index.store'
import { ThumbUp } from '@material-ui/icons'
import { useRouter } from 'next/router'
import DB from 'src/utils/fetchData'
import { TextField } from '@material-ui/core'
import TimeField from './sub-components/TimeField'
import useStyles from './CardComponent.style'
import TimerComponent from './sub-components/TimerComponent'
import sequenceDate, { dateStringDiference } from 'src/utils/sequenceDate'

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
  const { email } = _useStoreState(state => state)
  if (!email) return <></>
  const classes = useStyles()
  // const { habits } = _useStoreState(state => state)
  // const [cacheDid, setCacheDid] = useState(false)
  // const [doToday, setDoToday] = useState(2)

  const [proximoToDo, setProximoToDo] = useState(initialToDo)

  // const proximoToDo = useMemo(() => {
  //   const filtrado = historicDays.filter(value => value.feito !== 0)
  //   const proximoToDo =
  //     filtrado.length > 0
  //       ? calcNextTodo(historicDays.slice(-1)[0].feito, multiplicador)
  //       : initialToDo
  //   if (cacheDid) return calcNextTodo(proximoToDo, multiplicador)
  //   return proximoToDo
  // }, [historicDays, cacheDid])

  const [isInterval, setIsInterval] = useState(false)
  const [hojeFeito, setHojeFeito] = useState(false)

  const handleDid = async () => {
    // didToday({ index, didToday: nextToDo })
    // const url = process.env.NEXT_PUBLIC_URL
    const nextToDo = calcNextTodo(proximoToDo, multiplicador)
    setProximoToDo(nextToDo)
    DB.post('done', { index, done: proximoToDo, nextToDo }, email)
    // setCacheDid(true)
    setHojeFeito(true)
    setIsInterval(false)
  }

  useEffect(() => {
    if (
      historicDays.slice(-1)[0]?.data === new Date().toLocaleDateString('pt-br')
    ) {
      setIsInterval(false)
      setHojeFeito(true)
    }
  }, [historicDays])

  const router = useRouter()
  useEffect(() => {
    // !hojeFeito && setFaltantes(nextToDo)
  }, [proximoToDo])
  // console.log(sequenceDate)
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => router.push(`habit/config/${index}`)}>
        <div
          style={{
            position: 'absolute',
            padding: '5px 9px',
            borderRadius: '30px',
            background:
              dateStringDiference(
                historicDays.slice(-1)[0]?.data,
                new Date().toLocaleDateString('pt-br')
              ) === 2
                ? 'red'
                : 'gray',
          }}
        >
          {sequenceDate(historicDays)}
        </div>
        <TimerComponent
          Audio={Audio}
          isPlaying={isInterval}
          duration={proximoToDo}
          onEnded={() => handleDid()}
        />

        <CardMedia
          component="img"
          alt={title}
          height="140"
          width="20"
          image={
            imageUrl ||
            'https://baladasegura.rs.gov.br/themes/modelo-institucional/images/outros/GD_imgSemImagem.png'
          }
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
              onClick={() =>
                isInterval ? setIsInterval(false) : setIsInterval(true)
              }
              size="small"
              color={isInterval ? 'default' : 'primary'}
            >
              {isInterval ? 'Pausar' : 'Iniciar'}
            </Button>
          </>
        )}
        {!hojeFeito && (
          <Button
            variant="contained"
            onClick={() => handleDid()}
            size="small"
            color="primary"
          >
            done
          </Button>
        )}
        {type === 'repetition' ? (
          <TextField
            // id="outlined-number"
            label="Fazer"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={Math.round(proximoToDo)}
            variant="outlined"
          />
        ) : (
          <TimeField value={proximoToDo} />
        )}

        {hojeFeito && <ThumbUp color="primary" />}
      </CardActions>
    </Card>
  )
}
