import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponet = ({message}) => {
  return(
    <Alert 
      status='error' 
      position={"fixed"} 
      bottom={"4"} 
      left={"50%"} 
      transform={"translatex(-50%)"}
      w={"container.lg"}
    >
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default ErrorComponet