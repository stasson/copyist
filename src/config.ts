import * as cosmiconfig from 'cosmiconfig'
import * as process from 'process'

type ExpandDirectoriesOption = boolean | string[] | { files: string[]; extensions: string[] };

interface IConfig  {
  /**
   * The current working directory in which to search.
   */
  base?: string

  /**
   * Output Directory
   */
  output?: string

  /**
   * If set to `true`, will automatically glob directories for you.
   * If you define an `Array` it will only glob files that matches the patterns inside the Array.
   * You can also define an `Object` with `files` and `extensions` like below:
   */
  expandDirectories?: ExpandDirectoriesOption
  /**
   * An array of glob patterns to exclude matches.
   */
  ignore?: string[]
}


class Config implements IConfig {

  base = process.cwd()

  output  = 'output'

  expandDirectories = {
    files: ['README', 'LICENSE', '*.md'],
    extensions: ['.md']
  }

  ignore = ['node_modules/**']
}

const explorer = cosmiconfig('auditr')

export async function loadConfig(options?: IConfig): Promise<IConfig> {
  const config = new Config()
  const configFile = await explorer.search()
  if (configFile && configFile.config) {
    Object.assign(config, configFile.config)
  }
  if (options) {
    Object.assign(config, options)
  }
  return config
}
