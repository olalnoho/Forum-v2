const db = require('../DB/connection')

module.exports = async keys => {
   console.log('ran')
   const res = await db('subcategory').select('*').whereIn('category_id', keys)
   const map = {}
   res.forEach(x => {
      const key = x.category_id
      if (map[key]) {
         map[key].push(x)
      } else {
         map[key] = [x]
      }
   })
   return keys.map(x => map[x])
}

// const subcatLoader = new DataLoader(async keys => {
//    const res = await db('subcategory').select('*').whereIn('category_id', keys)
//    const map = {}
//    res.forEach(x => {
//       const key = x.category_id
//       if (map[key]) {
//          map[key].push(x)
//       } else {
//          map[key] = [x]
//       }
//    })
//    return keys.map(x => map[x])
// })

// module.exports = subcatLoader