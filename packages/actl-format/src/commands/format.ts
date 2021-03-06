import { Command } from '@oclif/command'
import execa from 'execa'
import {
  PRETTIER_CONFIG_PATH,
  PRETTIER_IGNORE_PATH,
} from '@atlantis-lab/config'
import { join } from 'path'

export default class FormatCommand extends Command {
  static description: string = 'Prettier format'
  static examples: string[] = ['$ actl format']

  async run(): Promise<void> {
    try {
      await execa('prettier', [
        '--write',
        '--config',
        PRETTIER_CONFIG_PATH,
        '--ignore-path',
        PRETTIER_IGNORE_PATH,
        join(process.cwd(), './**/*.{js,ts,tsx,yml,yaml,json,graphql,md,mdx}'),
      ], { stdio: 'inherit' });
    }
    catch (error) {
      this.log(error.stderr);
    }
  }
}
