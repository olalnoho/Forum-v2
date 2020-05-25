const generateToken = require('../utils/generateToken')

exports.resolver = {
   async getUserById({ id }, { db }) {
      try {
         const [user] = await db('user')
            .select('username', 'id')
            .where({ id })

         if (!user)
            throw new Error('User not found')

         return new User(user)
      } catch (err) {
         console.log('Error retrieving user')
         throw new Error(err)
      }
   },

   async registerUser({ username, email, password }, { db }) {
      try {
         const [success] = await db('user').insert({
            username,
            email,
            password
         })
         if (success > 0) {
            const [{ id }] = await db.raw('SELECT last_insert_rowid() as id FROM user');
            return {
               token: generateToken(id),
               user: {
                  id,
                  username,
                  email
               },
            }
         }
      } catch (err) {
         throw new Error(err)
      }
   },

   async loginUser() {
      
   }
}

class User {
   constructor({ email, username, id }) {
      Object.assign(this, {
         id,
         email,
         username
      })
   }
}

exports.User = User