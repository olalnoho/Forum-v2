export default pattern => cache => {
   const p = new RegExp(`^${pattern}`)
   Object.keys(cache.data.data).forEach(key =>
      key.match(p) && cache.data.delete(key)
   )
}