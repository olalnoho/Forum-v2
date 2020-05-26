import { useState } from 'react'

const useForm = (initValues = {}) => {
   const [formState, setFormState] = useState(initValues)

   const inputHandler = e => {
      setFormState({...formState, [e.target.name]: e.target.value})
   }

   return {
      inputHandler,
      formState
   }
}

export default useForm