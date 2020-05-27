const db = require('../DB/connection')

module.exports = async keys => {
   const res = await db('thread')
      .select('thread.id').as('id')
      .count('post.id')
      .whereIn('thread.id', keys)
      .innerJoin('post', 'post.thread_id', 'thread.id')
   const map = {}
   res.forEach(x => {
      const key = x.id
      map[key] = x['count(`post`.`id`)']
   })
   return keys.map(x => map[x])
}