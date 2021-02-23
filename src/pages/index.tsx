// import { makeStyles } from '@material-ui/core'
import { _useStoreState } from 'src/store/index.store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// const useStyles = makeStyles({
//   root: {
//     height: '100vh',
//     width: '100vw',
//   },
// })

function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [])

  // const isRehydrated = useStoreRehydrated()
  // const refAudio = useRef<HTMLAudioElement>(null)
  return <>CARREGANDO</>
}

export default Index
