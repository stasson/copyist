import * as MarkdownIt from 'markdown-it'
import * as MarkdownChain from 'markdown-it-chain'
import * as MarkdownAnchor from 'markdown-it-anchor'
import * as MarkdownPrism from 'markdown-it-prism'
import * as MarkdownFootnote from 'markdown-it-footnote'
import * as MarkdownFrontMatter from 'markdown-it-front-matter'
import MarkdownLink from './markdown-link'

const chain = new MarkdownChain()

chain
  .options
  .html(true)
  .linkify(true)
  .end()

  .plugin('mdlinks').use(MarkdownLink).end()
  .plugin('anchor').use(MarkdownAnchor).end()
  .plugin('highlight').use(MarkdownPrism).end()
  .plugin('footnote').use(MarkdownFootnote).end()
  .plugin('frontmatter').use(MarkdownFrontMatter, [()=>{}]).end()


const markdown: MarkdownIt = chain.toMd(MarkdownIt, chain)

export default markdown
