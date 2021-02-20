import { Button, makeStyles } from '@material-ui/core'
import { useStoreRehydrated } from 'easy-peasy'
import ReactJson from 'react-json-view'
import Layout from 'src/components/Layout'
import { _useStoreActions, _useStoreState } from 'src/store/index.store'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import calcNextTodo from 'src/utils/calcNextToDo'
import { DataGrid, RowModel } from '@material-ui/data-grid'

const useStyles = makeStyles({
  root: {
    // background: 'red',
    height: '100vh',
    width: '100vw',
  },
})

const HabitPage = () => {
  const { habits } = _useStoreState(store => store)
  const { changeHabit, deleteHabit } = _useStoreActions(action => action)
  const classes = useStyles()
  const isRehydrated = useStoreRehydrated()
  const router = useRouter()
  const myId = Number(router.query.id)

  const prevision = useMemo(() => {
    if (habits[myId] === undefined) return []
    const arrayPrevision: {
      id: number
      segundos: number
      minutos: number
    }[] = [
      {
        id: 0,
        segundos: Math.round(habits[myId].initialToDo),
        minutos: Math.round(habits[myId].initialToDo / 60),
      },
    ]
    for (let c = 0; c <= 400; c++) {
      const ultimo = arrayPrevision.slice(-1)[0].segundos
      const calculado = calcNextTodo(ultimo, habits[myId].multiplicador)
      arrayPrevision.push({
        id: c + 1,
        segundos: Math.round(calculado),
        minutos: Math.round(calculado / 60),
      })
    }
    return arrayPrevision
  }, [myId])

  const handleDeleteButton = () => {
    deleteHabit({ index: myId })
    router.push('/')
  }

  return (
    <div className={classes.root}>
      {isRehydrated && (
        <Layout>
          <ReactJson
            src={habits[myId]}
            onEdit={edit => {
              changeHabit({ index: myId, ...edit.updated_src })
            }}
          />
          <DataGrid
            columns={[
              { field: 'id', headerName: 'DIA' },
              { field: 'segundos', headerName: 'SEGUNDOS' },
              { field: 'minutos', headerName: 'MINUTOS' },
            ]}
            rows={prevision as RowModel[]}
            pageSize={30}
            rowHeight={30}
            filterModel={{
              items: [
                { columnField: 'id', operatorValue: 'contains', value: '50' },
              ],
            }}
          />
          <Button
            onClick={() => handleDeleteButton()}
            variant="outlined"
            color="secondary"
          >
            Excluir
          </Button>
        </Layout>
      )}
    </div>
  )
}

export default HabitPage
