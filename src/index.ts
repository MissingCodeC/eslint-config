import type { Linter } from 'eslint'

import javascript from './configs/javascript'
import typescript from './configs/typescript'
import stylistic from './configs/stylistic'
import formatter from './configs/prettier'
import ignores from './configs/ignores'

function missingcodec(): Linter.Config[] {
  return [
    ...javascript(),
    ...typescript(),
    ...stylistic(),
    ...formatter(),
    ...ignores(),
  ]
}

export default missingcodec
