import { ForwardRefRenderFunction, ReactNode } from 'react'
import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  error?: any
  leftComponent?: ReactNode
  rightComponent?: ReactNode
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, leftComponent, rightComponent, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        <InputGroup size="lg">
          {leftComponent && (
            <InputLeftElement opacity={0.5} pointerEvents="none">
              {leftComponent}
            </InputLeftElement>
          )}
          <ChakraInput
            name={name}
            id={name}
            focusBorderColor="white"
            background="#010101"
            errorBorderColor="crimson"
            border={error ? '1px solid red' : 'none'}
            variant="filled"
            autoComplete="nope"
            _autofill={{
              boxShadow: 'inset 0 0 0 100px #fff',
              backgroundColor: 'var(--chakra-colors-dark) !important',
              color: 'white !important'
            }}
            _readOnly={{
              ckgroundColor: 'var(--chakra-colors-dark) !important',
              color: 'white !important'
            }}
            _hover={{
              background: 'dark'
            }}
            _focus={{
              background: 'dark'
            }}
            borderRadius="10px"
            fontSize="16px"
            size="lg"
            ref={ref}
            {...rest}
          />
          {rightComponent && (
            <InputRightElement marginRight="10px">
              {rightComponent}
            </InputRightElement>
          )}
        </InputGroup>

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }
