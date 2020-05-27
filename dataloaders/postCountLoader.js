const db = require('../DB/connection')

module.exports = async keys => {
   const res = await db('subcategory')
      .count('post.id')
      .select('subcategory.id')
      .whereIn('category_id', keys)
      .innerJoin('thread', 'thread.subcategory_id', 'subcategory.id')
      .innerJoin('post', 'post.thread_id', 'thread.id')
      .groupBy('subcategory.id')

   const map = {}
   res.forEach(x => {
      const key = x.id
      map[key] = x['count(`post`.`id`)']
   })
   return keys.map(x => map[x])
}