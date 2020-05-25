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