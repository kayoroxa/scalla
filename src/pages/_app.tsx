import type { AppProps } from 'next/app'
import { StoreProvider } from 'easy-peasy'
import store from '../store/index.store'
import { CssBaseline } from '@material-ui/core'

export default function MyApp({ Component, pageProps }: AppProps) {
  const contextProps = {}
  return (
    <StoreProvider store={store}>
      <CssBaseline />
      <Component {...pageProps} {...contextProps} />
    </StoreProvider>
  )
}
