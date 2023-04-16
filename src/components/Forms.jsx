import { Input, Stack, Button, Center } from '@chakra-ui/react'

function Forms(){

  return(
<>
<Stack spacing={3}>
  <Input placeholder='Nombre' size='md' />
  <Input placeholder='Apellido' size='md' />
  <Input placeholder='Email' size='md' />
  <Button colorScheme='blue'>Suscribirse</Button>
</Stack>
</>
  )
}

export default Forms;
