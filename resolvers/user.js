module.exports = {
   async getUserById(params, ctx) {
      const [user] = await ctx.db('user')
         .select('email', 'username', 'id')
         .where({
            id: params.id
         })
      if (!user)
         throw new Error('User not found')
      return user
   }
}