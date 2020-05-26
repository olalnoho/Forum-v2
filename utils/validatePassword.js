const bcrypt = require('bcryptjs')

module.exports = async function(hashedPw, loginPw) {
   if(loginPw.length < 6) throw new Error('Invalid Credentials')
   return await bcrypt.compare(loginPw, hashedPw)
}