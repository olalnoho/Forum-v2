const generateToken = require('../utils/generateToken')
const validatePassword = require('../utils/validatePassword')
const hashPassword = require('../utils/hashPassword')

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
         const hashedPassword = await hashPassword(password)
         const userExists = await db('user').select('id').where({ username }).orWhere({ email })
         if(userExists.length > 0) {
            throw new Error('User already exists')
         }
         const [success] = await db('user').insert({
            username,
            email,
            password: hashedPassword
         })
         if (success) {
            const [{ id }] = await db.raw('SELECT last_insert_rowid() as id FROM user');
            return {
               token: generateToken(id),
               user: {
                  id,
                  username,
                  email
               },
            }
         } else {
            throw new Error('User could not be saved')
         }
      } catch (err) {
         console.log('Error registering user')
         console.log(err)
         throw new Error(err)
      }
   },

   async loginUser({ username, password }, { db }) {
      try {
         const [user] = await db('user')
            .select('*')
            .where({ username })

         if (!user) throw new Error('Invalid Credentials')

         const isValidPassword = await validatePassword(user.password, password)
         if (!isValidPassword) throw new Error('Invalid Credentials')

         return {
            token: generateToken(user.id),
            user: {
               id: user.id,
               email: user.email,
               username: user.username
            }
         }
      } catch (err) {
         console.log('Error loggin in user')
         throw new Error('Invalid Credentials')
      }
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