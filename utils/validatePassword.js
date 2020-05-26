const bcrypt = require('bcryptjs')

module.exports = async function(hashedPw, loginPw) {
   return await bcrypt.compare(loginPw, hashedPw)
}