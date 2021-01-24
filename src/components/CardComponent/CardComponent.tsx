import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Badge } from '@material-ui/core'
import ValueCircle from './sub-components/ValueCircle'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
})

interface IProps {
  imageUrl?: string
  title: string
  nextToDo: number
  last10Days: (number | null)[]
  multiplicador: number
}

export default function CardComponent({
  imageUrl,
  title,
  nextToDo,
  last10Days,
  multiplicador,
}: IProps) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          width="20"
          image={imageUrl}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {/* <ValueCircle value={[5, 6, 8]} /> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Iniciar
        </Button>
        <Button size="small" color="primary" disabled>
          Pausar
        </Button>
      </CardActions>
    </Card>
  )
}
