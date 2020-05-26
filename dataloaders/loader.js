const db = require('../DB/connection')

module.exports = (table, comparer) => async keys => {
   const res = await db(table)
      .select('*')
      .whereIn(comparer, keys)

   const map = {}
   res.forEach(x => {
      const key = x[comparer]
      if (map[key]) {
         map[key].push(x)
      } else {
         map[key] = [x]
      }
   })
   return keys.map(x => map[x])
}