import { AppProps } from 'next/app'
import { RootProvider } from '../contexts/root'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  )
}
