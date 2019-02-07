import * as cac from 'cac'
import { loadConfig } from './config'
import render from './render'
import * as fs from 'fs-extra'
import * as glob from 'globby'
import * as path from 'path'
import * as process from 'process'

const { name, version } = require('../package.json')
const cli = cac(name)

cli
  // https://www.npmjs.com/package/cac#usage
  .command('[...input]', 'github flavor markdown files glob')
  .option('-b, --base <dir>', 'the base directory in which to search' )
  .option('-o, --output <dir>', 'output directory', {
    default: 'output',
  })
  .action(async (input, flags : {base:string, output:string}) => {
    const options = await loadConfig(flags)

    if (!input.length ) {
      input = ['.']
    }

      const files = await glob(input, {
        cwd: path.normalize(options.base),
        expandDirectories: options.expandDirectories,
        ignore: options.ignore
      })
      // Todo: make sure belongs to working dir

      files.forEach(file => {
        const mdFile = path.join(options.base,file)
        const md = fs.readFileSync(mdFile, 'utf8')

        let {dir, name} = path.parse(file)
        if (name.toLocaleUpperCase() == 'README') {
          name = 'index'
        }
        const destDir = path.join(options.output, dir)
        const destFile = path.join(destDir, name + '.html')
        console.info(`rendering ${destFile} from ${mdFile}  ...`)

        const html = render(md)
        fs.mkdirpSync(destDir)
        fs.writeFileSync(destFile, html)
      })
  })

cli.version(version)
cli.help()
cli.parse()
