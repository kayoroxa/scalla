import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import jurosCompostos from '../utils/jurosCompostos'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow)

function createData(day: Number, todo: string | number) {
  return { day, todo }
}

const useStyles = makeStyles({
  table: {
    // minWidth: 700,
  },
})

interface IProps {
  initial: number
  multiplicador: number
  type: string
}

export default function TableJC({ initial, multiplicador, type }: IProps) {
  const classes = useStyles()

  if (initial === undefined || multiplicador === undefined) return <></>

  const getTime = (day: number) => {
    const seconds = jurosCompostos(initial, multiplicador, day)
    const miliSegundos = new Date(Math.round(seconds) * 1000)
    try {
      return new Date(miliSegundos).toISOString().substr(11, 8)
    } catch (error) {
      return '+23:59:59'
    }
  }

  const getRep = (day: number) => {
    return Math.round(jurosCompostos(initial, multiplicador, day))
  }

  const isTimer = type === 'timer'

  const rows = [
    createData(7, isTimer ? getTime(7) : getRep(7)),
    createData(14, isTimer ? getTime(14) : getRep(14)),
    createData(30, isTimer ? getTime(30) : getRep(30)),
    createData(90, isTimer ? getTime(90) : getRep(90)),
    createData(180, isTimer ? getTime(180) : getRep(180)),
    createData(365, isTimer ? getTime(365) : getRep(365)),
  ]

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">DAY</StyledTableCell>
            <StyledTableCell align="center">DO</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.day}
              </StyledTableCell>
              <StyledTableCell align="center">{row.todo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
