import { useState } from 'react'

const useForm = (initValues = {}) => {
   const [formState, setFormState] = useState(initValues)

   const inputHandler = e => {
      setFormState({...formState, [e.target.name]: e.target.value})
   }

   const clearInput = e => {
      setFormState(initValues)
   }

   return {
      inputHandler,
      formState,
      clearInput
   }
}

export default useForm