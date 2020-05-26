export default err => {
   if(err.message) {
      return err.message.replace('Error: ', '')
   }
   return 'An unknown error occurred'
}