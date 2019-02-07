import * as MarkdownIt from 'markdown-it'
import * as MarkdownChain from 'markdown-it-chain'
import * as MarkdownAnchor from 'markdown-it-anchor'
import * as MarkdownPrism from 'markdown-it-prism'
import MarkdownLink from './markdown-link'

const chain = new MarkdownChain()

chain
  .options
  .html(true)
  .linkify(true)
  .typographer(true)
  .end()

  .plugin('mdlinks').use(MarkdownLink).end()
  .plugin('anchor').use(MarkdownAnchor).end()
  .plugin('highlight').use(MarkdownPrism).end()


const markdown: MarkdownIt = chain.toMd(MarkdownIt, chain)

export default markdown
