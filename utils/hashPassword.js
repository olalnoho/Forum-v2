const bcrypt = require('bcryptjs')

module.exports = async function(password) {
   if(password.length < 6) throw new Error('Password is too short')
   return await bcrypt.hash(password, 10)
}