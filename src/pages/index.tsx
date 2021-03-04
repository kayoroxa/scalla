// import { makeStyles } from '@material-ui/core'
import { _useStoreActions, _useStoreState } from 'src/store/index.store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Avatar,
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface IForm {
  email: string
}

function Index() {
  const classes = useStyles()
  const router = useRouter()
  const { email } = _useStoreState(state => state)
  const { changeEmail } = _useStoreActions(actions => actions)

  // const [email, setEmail] = useState<string | null>(null)

  const { register, handleSubmit } = useForm<IForm>()

  const funcHandleSubmit = async (data: IForm) => {
    const { email } = data
    // localStorage.setItem('email', email)
    changeEmail(email)

    return router.push('/home')
  }

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    // const email = localStorage.getItem('email')
    // changeEmail(email)
    if (email) router.push('/home')
    // }
  }, [])

  return !email ? (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmojiEmotionsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
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
            id="email"
            label="email"
            name="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Okay
          </Button>
        </form>
      </div>
    </Container>
  ) : (
    <div>Carregando</div>
  )
}

export default Index
