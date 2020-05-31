import { useState } from 'react'

const useForm = (initValues = {}) => {
   const [formState, setFormState] = useState(initValues)

   const inputHandler = e => {
      setFormState({ ...formState, [e.target.name]: e.target.value })
   }

   const clearInput = e => {
      setFormState(initValues)
   }

   const setInput = (key, value, separator) => {
      let currentValue = formState[key]
      if(currentValue === (null || undefined)) return
      currentValue += (separator + value)
      setFormState({...formState, [key]: currentValue})
   }

   return {
      inputHandler,
      formState,
      clearInput,
      setInput
   }
}

export default useForm