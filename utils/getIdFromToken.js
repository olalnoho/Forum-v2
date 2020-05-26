const jwt = require('jsonwebtoken')

module.exports = (headers, requiresAuth = true) => {
   const { authorization: token } = headers
   if (!token && requiresAuth) throw new Error('Not Authorized')

   try {
      const decodedToken = jwt.verify(token, 'secret')
      return decodedToken.userId
   } catch {
      throw new Error('Not Authorized')
   }
}