import type { Linter } from 'eslint'

import javascript from './configs/javascript'
import typescript from './configs/typescript'
import stylistic from './configs/stylistic'
import prettier from './configs/prettier'
import ignores from './configs/ignores'
import { isPackageAvailable } from './utils'
import type { ConfigOptions } from './types'
import angular from './configs/angular'
import { defineConfig } from 'eslint/config'

const defaultConfig : ConfigOptions = {
  typescript : isPackageAvailable('typescript'),
  angular    : isPackageAvailable('@angular/core'),
  stylistic  : {},
  prettier   : {},
}

async function missingcodec(options : ConfigOptions = {}, ...configs : Linter.Config[]) : Promise<Linter.Config[]> {
  const allOptions = { ...defaultConfig, ...options }

  return defineConfig([
    ...javascript(),
    ...(
      allOptions.typescript === false
        ? []
        : allOptions.typescript === true
          ? await typescript()
          : await typescript(allOptions.typescript)
    ),
    ...(allOptions.angular ? await angular() : []),
    ...stylistic(allOptions.stylistic),
    ...prettier(allOptions.prettier),
    ...ignores(),
    ...configs,
  ])
}

export default missingcodec
