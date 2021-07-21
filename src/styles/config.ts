import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: '#111',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      },
      '::-webkit-autofill': {},
      '::-webkit-autofill:hover': {},
      '::-webkit-autofill:focus': {},
      'input:-webkit-autofill:hover': {},
      'input:-webkit-autofill:focus': {},
      '.css-1ms0iwq:autofill': {
        boxShadow: 'inset 0 0 0 100px var(--chakra-colors-black)',
        backgroundColor: '#222 !important',
        color: 'white !important'
      },
      'input:-webkit-autofill': {
        boxShadow: 'inset 0 0 0 100px var(--chakra-colors-black)',
        backgroundColor: '#222 !important',
        color: 'white !important'
      },
      'input:-internal-autofill-selected': {
        backgroundColor: '#222 !important',
        color: 'white !important'
      }
    }
  }
})
