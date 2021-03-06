import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import HomeIcon from '@material-ui/icons/Home'
import MoreVert from '@material-ui/icons/MoreVert'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { _useStoreActions } from 'src/store/index.store'
import { useRouter } from 'next/router'
// import { signIn, signOut, useSession } from 'next-auth/client'

// import { THEMES } from 'src/utils/constants'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    cursor: 'pointer',
    height: 18,
    marginLeft: theme.spacing(3),
  },
  search: {
    //   padding: '2px 4px',
    display: 'flex',
    //   alignItems: 'center',
    height: 35,
    width: 700,
  },
  input: {
    flex: 1,
  },
  avatar: {
    cursor: 'pointer',
  },
}))

function TopBar({ useImage }: { useImage?: string }) {
  const classes = useStyles()
  //   const [session] = useSession()
  const session = true
  //   const { settings, saveSettings } = useSettings()
  const router = useRouter()
  const { changeEmail } = _useStoreActions(actions => actions)
  const signOut = () => {
    changeEmail(null)
    router.push('/')
  }
  return (
    <AppBar className={classes.root} color="default">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => {
              router.push('/home')
            }}
          >
            <HomeIcon />
          </IconButton>

          {/* <img
            src={
              settings.theme === THEMES.DARK
                ? '/branco.png'
                : '/new-youtube-logo.svg'
            }
            alt="logo"
            className={classes.logo}
          /> */}
        </Box>
        <Hidden mdDown>
          <Box display="flex">
            {/* <Paper component="form" className={classes.search}>
              <InputBase
                className={classes.input}
                placeholder="Nome"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </Paper> */}
            {/* <TextField
              id="outlined-select-currency"
              select
              label="Tipo"
              value={currency}
              onChange={handleChange}
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="outlined-helperText" label="Nome" /> */}
          </Box>
        </Hidden>
        <Box display="flex">
          {/* <IconButton>
            {settings.theme === THEMES.DARK ? (
              <Brightness7Icon
                onClick={() => saveSettings({ theme: THEMES.LIGHT })}
              />
            ) : (
              <Brightness4Icon
                onClick={() => saveSettings({ theme: THEMES.DARK })}
              />
            )}
          </IconButton> */}
          <IconButton onClick={() => router.push('/habit/create')}>
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          {!session ? (
            <Button
              color="primary"
              component="a"
              variant="outlined"
              startIcon={<AccountCircle />}
              //   onClick={() => signIn('google')}
            >
              Fazer Login
            </Button>
          ) : (
            <Box display="flex" alignItems="center">
              <Avatar
                onClick={() => signOut()}
                alt="User"
                src={useImage}
                className={classes.avatar}
                // src={session?.user?.image}
              />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
