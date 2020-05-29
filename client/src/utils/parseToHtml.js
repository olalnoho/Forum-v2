const regex = {
   tokenize: /(\[\/?(?:b|u|i|quote(?:=(?:(?:'|")\w*?(?:'|")))?)\])/g,
   openTag: /\[(b|u|i|quote(?:=(?:'|")\w*?(?:'|")))\]/,
   closeTag: /\[\/(b|u|i|quote)\]/,
   getTag: /\[\/?(b|u|i|(quote)(?:=(?:'|")\w*?(?:'|"))?)\]/,
   getName: /(?:"|')([a-z1-9]*)(?:'|")/i
}

class TagError extends Error {
   constructor(tag) {
      super(`Got unsupported tag ${tag}`)
   }
}

Object.defineProperty(Array.prototype, 'last', {
   get() { return this[this.length - 1] }
})

const createTextNode = tag => {
   tag = tag.toLowerCase()
   let className;
   switch (tag) {
      case 'b':
         className = 'code-bold'
         break
      case 'i':
         className = 'code-italic'
         break
      case 'u':
         className = 'code-underline'
         break
      default:
         // @note
         // It should never get here.
         throw new TagError(tag)
   }
   const el = document.createElement(tag)
   el.classList.add(className)
   return el
}

const createQuoteNode = tag => {
   const name = tag.match(regex.getName)[1]
   const el = document.createElement('blockquote')
   el.classList.add('code-quote')

   if (name) {
      const n = document.createElement('strong')
      n.classList.add('said')
      n.textContent = name + ' said:'
      el.appendChild(n)
   }
   return el
}

const closeUnclosedTags = (stack, tag, el) => {
   if (stack.last.tagName.toLowerCase() === tag) return el
   const c = stack.pop()
   c.appendChild(el)
   return closeUnclosedTags(stack, tag, c)
}

const appendRemaining = stack => {
   if (stack.length === 1) return
   const el = stack.pop()
   stack.last.appendChild(el)
   return appendRemaining(stack)
}

const parseToHtml = string => {
   const tokens = string.split(regex.tokenize)
   const root = document.createElement('div')
   const stack = [root]
   for (const token of tokens) {
      if (regex.openTag.test(token)) {
         const [_, tag, isQuote] = token.match(regex.getTag)
         if (!tag) throw new Error('tag missing from ' + token)
         let node;
         if (isQuote === 'quote') node = createQuoteNode(tag)
         else node = createTextNode(tag)
         stack.push(node)
      } else if (regex.closeTag.test(token)) {
         let el = stack.pop()
         const tag = token.match(regex.getTag)[1]
         if (el.tagName.toLowerCase() !== tag && (el.tagName.toLowerCase() === 'blockquote' && tag !== 'quote')) {
            const t = closeUnclosedTags(stack, tag, el)
            stack.last.appendChild.push(t)
            el = stack.last
            stack.pop()
         }
         stack.last.appendChild(el)
      } else {
         if (token) {
            stack.last.appendChild(
               document.createTextNode(token)
            )
         }
      }
   }
   if (stack.length > 1) {
      appendRemaining(stack)
   }
   return root.innerHTML
}

export default parseToHtml