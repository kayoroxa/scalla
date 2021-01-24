import { makeStyles } from '@material-ui/core'
import CardComponent from '../components/CardComponent/CardComponent'

interface IProps {}
const imagesUrls = {
  meditation:
    'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2020/08/6-aplicativos-que-v%C3%A3o-ensinar-voc%C3%AA-a-praticar-medita%C3%A7%C3%A3o.jpg',
}

const useStyles = makeStyles({
  root: {
    background: 'red',
    height: '100vh',
    width: '100vw',
  },
})

const HomePage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {/* <CardComponent
        title="Meditação"
        imageUrl={imagesUrls.meditation}
        nextToDo={5}
        last10Days={[4, 10, 98]}
        multiplicador={0.8}
      /> */}
    </div>
  )
}

export default HomePage
