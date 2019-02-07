import * as path from 'path'

function replaceAttr(token, attrName, replace, env) {
  token.attrs.forEach(function(attr) {
    if (attr[0] === attrName) {
      attr[1] = replace(attr[1], env, token)
    }
  })
}

function replaceLink(link, env) {
  // if is not absolute and ends with .md
  if (!path.isAbsolute(link)) {
    const ext = path.extname(link)
    if (ext == '.md') {
      const { dir, ext, name } = path.parse(link)
      if (name.toLocaleUpperCase() == 'README') {
        return path.join(dir, 'index.html')
      } else {
        return path.join(dir, name + '.html')
      }
    }

    return link
  }
}

// function replaceImage(link, env) {
//   return link
// }

export default function(md) {
  md.core.ruler.after('inline', 'replace-link', function(state) {
    state.tokens.forEach(function(blockToken) {
      if (blockToken.type === 'inline' && blockToken.children) {
        blockToken.children.forEach(function(token) {
          const type = token.type
          if (type === 'link_open') {
            replaceAttr(token, 'href', replaceLink, state.env)
            // } else if (type === 'image') {
            //   replaceAttr(token, 'src', replaceImage, state.env)
          }
        })
      }
    })
    return false
  })
}
