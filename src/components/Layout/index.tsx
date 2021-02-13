import { makeStyles } from '@material-ui/core'
import NavBar from './NavBar'
import TopBar from './TopBar'

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: 256,
    // },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}))

export default function Layout({ children }: any) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TopBar />
      {/* <NavBar /> */}
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}
