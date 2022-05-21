import { MantineProvider } from '@mantine/core'
import { AnimatePresence } from 'framer-motion'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <AnimatePresence
      exitBeforeEnter
      // initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <MantineProvider
        theme={{
          fontFamily: 'Catamaran, sans-serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          headings: { fontFamily: 'Catamaran, sans-serif' },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </AnimatePresence>
  </>
}

export default MyApp
