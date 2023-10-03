import { execa } from 'execa'
import fs from 'fs-extra'

export async function installDependencies(dependencies: string[], devDependencies: string[]) {
  if (dependencies.length !== 0)
    await execa('pnpm', ['add', ...dependencies], {
      stdio: 'inherit',
    })

  if (devDependencies.length !== 0)
    await execa('pnpm', ['add', '-D', ...devDependencies], {
      stdio: 'inherit',
    })
}
