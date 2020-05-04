const user = require('./user')

module.exports = {
   ...user,
   User: {
      test(){
         return 'fuck';
      }
   }
}