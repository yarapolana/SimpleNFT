import { FC } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'styles/config'

export const RootProvider: FC = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)
