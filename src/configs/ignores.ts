import type { Linter } from 'eslint'

function ignores() : Linter.Config[] {
  return [{ ignores : ['node_modules', 'dist'] }]
}

export default ignores
