exports.resolver = {
   async getUserById({ id }, { db }) {
      try {
         const [user] = await db('user')
            .select('username', 'id')
            .where({
               id
            })

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
   constructor(init) {
      // schema does field validation for us.
      // no need to do it here.
      this.email = init.email
      this.username = init.username
      this.id = init.id
   }
}

exports.User = User