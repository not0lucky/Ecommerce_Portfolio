import '../styles/globals.css'
import {AnimatePresence} from 'framer-motion'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f3f5};
  
`

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <AnimatePresence exitBeforeEnter>
    <GlobalStyle/>
     <Component {...pageProps} /> 

    </AnimatePresence>
  </Provider>
  )
}

export default MyApp
