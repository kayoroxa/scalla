import { Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import React from 'react'
import EditInPlace from '../EditInPlace'

import { ContainerBoxContent } from './styles-box-content'

interface IProps {
  name: string
  nextToDo: number
  multiplicador: number
  last10Days: (number | null)[]
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: 'gray',
    color: theme.palette.text.secondary,
  },
}))

const BoxContent = ({ name, nextToDo, multiplicador, last10Days }: IProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <EditInPlace
              value={name}
              label="name"
              onChangeValue={() => {
                console.log('oi')
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <EditInPlace
              value={nextToDo}
              label="nextToDo"
              onChangeValue={() => {
                console.log('oi')
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <EditInPlace
              value={multiplicador}
              label="multiplicador"
              onChangeValue={() => {
                console.log('oi')
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <EditInPlace
              value={JSON.stringify(last10Days)}
              label="last10Days"
              onChangeValue={() => {
                console.log('oi')
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default BoxContent
