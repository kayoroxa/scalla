import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useForm, Controller } from 'react-hook-form'
import { Box, Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import DB from 'src/utils/fetchData'
import { useRouter } from 'next/router'
import Layout from 'src/components/Layout'
import { IHabits } from 'src/utils/@types/habits.interface'
import { useHabit } from 'src/utils/useSWR'
import { _useStoreState } from 'src/store/index.store'
import TableJC from '../../components/TableJC'
import calcNextTodo from 'src/utils/calcNextToDo'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface IProps {
  // initialData: IHabits
  method: string
  habitIndex: number
}

export default function SignIn({ method, habitIndex }: IProps) {
  const { email } = _useStoreState(state => state)
  if (!email) return <></>
  const router = useRouter()
  const { data } = useHabit()

  const habits: IHabits[] = data

  const isCreate = method === 'create'
  let initialData: IHabits

  if (method === 'create' || !habits)
    initialData = {
      title: 'title',
      type: 'timer',
      multiplicador: 1,
      imageUrl: '',
      historicDays: [],
      initialToDo: 60,
    }
  else initialData = habits[habitIndex]

  const classes = useStyles()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
  } = useForm<IHabits>()

  const { multiplicador, initialToDo, type } = watch([
    'multiplicador',
    'initialToDo',
    'type',
  ])

  // console.log(watchMultiplicador)

  const funcHandleSubmit = async (data: IHabits) => {
    const { title, imageUrl, initialToDo, multiplicador, type } = data
    if (isCreate) {
      await DB.post(
        'create',
        {
          title,
          type,
          multiplicador: Number(multiplicador),
          imageUrl,
          historicDays: initialData.historicDays,
          initialToDo: Number(initialToDo),
        },
        email
      )
    } else if (habitIndex !== undefined) {
      await DB.post(
        'set',
        {
          index: habitIndex,
          newData: {
            title,
            type,
            multiplicador: Number(multiplicador),
            imageUrl,
            historicDays: initialData?.historicDays,
            initialToDo: Number(initialToDo),
          },
        },
        email
      )
    } else throw new Error('HabitIndex Undefined')

    router.push('/home')
  }

  const handleRecalcularButton = () => {
    const { historicDays } = initialData
    const filtrado = historicDays.filter(value => value.feito !== 0)
    debugger
    const trueMultiplicador = multiplicador ?? initialData.multiplicador
    const proximoToDo =
      filtrado.length > 0
        ? calcNextTodo(historicDays.slice(-1)[0].feito, trueMultiplicador)
        : initialData.initialToDo
    console.log(proximoToDo)
    setValue('initialToDo', proximoToDo)
  }

  console.log(type)
  return (
    initialData && (
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EmojiEmotionsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isCreate ? 'Create Habit' : 'Habit Config'}
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(data => funcHandleSubmit(data))}
            >
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                required
                fullWidth
                id="name"
                label="name"
                name="title"
                defaultValue={initialData.title}
                autoFocus
              />

              <Controller
                variant="outlined"
                fullWidth
                as={
                  <Select>
                    <MenuItem value="timer">timer</MenuItem>
                    <MenuItem value="repetition">repetition</MenuItem>
                  </Select>
                }
                control={control}
                name="type"
                defaultValue={initialData.type}
              />

              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                required
                fullWidth
                name="imageUrl"
                label="imageUrl"
                id="imageUrl"
                defaultValue={initialData.imageUrl}
              />
              <Box display="flex" justifyContent="space-between">
                <TextField
                  variant="outlined"
                  margin="normal"
                  inputRef={register}
                  required
                  type="number"
                  name="initialToDo"
                  label={
                    initialData.type || type === 'timer'
                      ? 'tempo atual (s)'
                      : 'qnt repetição atual'
                  }
                  id="initialToDo"
                  defaultValue={initialData.initialToDo}
                />

                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  onClick={handleRecalcularButton}
                >
                  recalcular atual
                </Button>
              </Box>

              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                required
                type="number"
                name="multiplicador"
                label="multiplicador (%)"
                id="multiplicador"
                defaultValue={initialData.multiplicador}
              />

              <TableJC
                initial={initialToDo ?? initialData.initialToDo}
                multiplicador={multiplicador ?? initialData.multiplicador}
                type={type ?? initialData.type}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Okay
              </Button>
            </form>
          </div>
        </Container>
      </Layout>
    )
  )
}

export async function getServerSideProps(context: any) {
  const method = context.params.method[0]

  //   if (method === 'create') {
  //     return {
  //       props: {
  //         initialData: {
  //           title: 'title',
  //           type: 'timer',
  //           multiplicador: 0.01,
  //           imageUrl: '',
  //           historicDays: [],
  //           initialToDo: 60,
  //         },
  //         method,
  //       },
  //     }
  //   }
  const habitIndex: number = Number(context.params.method[1])
  //   // // const habitIndex: number = Number(context.params.index)
  //   // const habits = await DB.get()
  //   // console.log(habits)

  return {
    props: {
      // initialData: false,
      method,
      habitIndex,
    },
  }
}

// const prevision = useMemo(() => {
//   if (habits[myId] === undefined) return []
//   const arrayPrevision: IPrevision[] = [
//     {
//       id: 0,
//       segundos: Math.round(habits[myId].initialToDo),
//       minutos: Math.round(habits[myId].initialToDo / 60),
//     },
//   ]
//   for (let c = 0; c <= 400; c++) {
//     const ultimo = arrayPrevision.slice(-1)[0].segundos
//     const calculado = calcNextTodo(ultimo, habits[myId].multiplicador)
//     arrayPrevision.push({
//       id: c + 1,
//       segundos: calculado,
//       minutos: calculado / 60,
//     })
//   }
//   return arrayPrevision
// }, [myId])
// <DataGrid
//             columns={[
//               { field: 'id', headerName: 'DIA' },
//               { field: 'segundos', headerName: 'SEGUNDOS' },
//               { field: 'minutos', headerName: 'MINUTOS' },
//             ]}
//             rows={prevision as RowModel[]}
//             pageSize={30}
//             rowHeight={30}
//             filterModel={{
//               items: [
//                 { columnField: 'id', operatorValue: 'contains', value: '50' },
//               ],
//             }}
//           />
