const jwt = require('jsonwebtoken')

module.exports = function (id) {
   return jwt.sign({ userId: id }, 'secret', {
      expiresIn: 36000
   })
}