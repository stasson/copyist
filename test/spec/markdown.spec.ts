import { markdown } from '../../src'

describe('renderer', () => {
  it('should render headers', () => {
    const html = markdown.render(`
# This is level1

## This is level2

###### This level6
    `)

    expect(html).toMatchInlineSnapshot(`
"<h1 id=\\"this-is-level1\\">This is level1</h1>
<h2 id=\\"this-is-level2\\">This is level2</h2>
<h6 id=\\"this-level6\\">This level6</h6>
"
`)
  })
})

describe('renderer', () => {
  it('should render tables', () => {
    const html = markdown.render(`
| title | desc                  |
|-------|-----------------------|
| Dune  | one of the best books |
    `)

    expect(html).toMatchInlineSnapshot(`
"<table>
<thead>
<tr>
<th>title</th>
<th>desc</th>
</tr>
</thead>
<tbody>
<tr>
<td>Dune</td>
<td>one of the best books</td>
</tr>
</tbody>
</table>
"
`)
  })

  describe('renderer', () => {
    it('should render code', () => {
      const html = markdown.render(`
\`\`\`javascript
const var = 3
\`\`\`
      `)

      expect(html).toMatchInlineSnapshot(`
"<pre class=\\"language-javascript\\"><code class=\\"language-javascript\\"><span class=\\"token keyword\\">const</span> <span class=\\"token keyword\\">var</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">3</span>
</code></pre>
"
`)
    })
  })

  describe('renderer', () => {
    it('should render md links', () => {
      const html = markdown.render(`
- [link1](./link.md)
- [link2](./README.md)
`)

      expect(html).toMatchInlineSnapshot(`
"<ul>
<li><a href=\\"link.html\\">link1</a></li>
<li><a href=\\"index.html\\">link2</a></li>
</ul>
"
`)
    })
  })

  // describe('renderer', () => {
  //   it('should render xxx', () => {
  //     const html = markdown.render(`
  //# mardown
  //`)
  //     expect(html).toMatchInlineSnapshot()
  //   })
  // })
})
