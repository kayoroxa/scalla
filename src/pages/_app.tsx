import '../styles/reset.css'
import type { AppProps } from 'next/app'
import { StoreProvider } from 'easy-peasy'
import store from '../store/index.store'

export default function MyApp({ Component, pageProps }: AppProps) {
  const contextProps = {}
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} {...contextProps} />
    </StoreProvider>
  )
}
