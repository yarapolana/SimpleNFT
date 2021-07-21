import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Button, Stack, Flex } from '@chakra-ui/react'
import { Input } from '../Input'

export interface MintFormData {
  color: string
}

interface MintFormProps {
  onMint: SubmitHandler<MintFormData>
  totalSupply: number
}

export const mintSchema = Yup.object().shape({
  color: Yup.string().required('Color is required')
})

export const MintForm = ({ onMint }: MintFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<MintFormData>({
    resolver: yupResolver(mintSchema)
  })

  return (
    <Stack align="center" w="350px">
      <Flex
        w="100%"
        as="form"
        direction="column"
        onSubmit={handleSubmit(onMint)}
      >
        <Input
          name="color"
          placeholder="Color Hex Value"
          error={errors.color}
          {...register('color')}
        />
        <Button
          type="submit"
          w="100%"
          mt="1rem"
          height="50px"
          rounded="2xl"
          colorScheme="red"
          textTransform="uppercase"
          letterSpacing="1px"
          isLoading={isSubmitting}
        >
          Mint
        </Button>
      </Flex>
    </Stack>
  )
}
