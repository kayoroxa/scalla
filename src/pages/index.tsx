import { Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import styled from 'styled-components'
import BoxContent from '../components/BoxContent'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // background: ,
    color: theme.palette.text.secondary,
  },
}))

export default function Home() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
      <BoxContent
        name={'cantar'}
        nextToDo={5}
        last10Days={[4, null]}
        multiplicador={0.8}
      />
      <div></div>
      <TextField label="Helper text" defaultValue={8} variant="outlined" />
    </div>
  )
}
