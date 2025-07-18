import plugin from 'eslint-plugin-prettier'
import type { Linter } from 'eslint'

import { plainParser } from '../utils'
import type { FormatterSutup, PrettierOptions } from '../types'

let templateParser : Linter.Parser

try {
  const ng = await import('angular-eslint')
  templateParser = ng.templateParser as Linter.Parser
} catch {}

const setups : FormatterSutup[] = [
  {
    name       : 'noa/format/html',
    files      : ['**/*.htm?(l)'],
    fileParser : templateParser ?? plainParser,
    options : {
      parser : templateParser ? 'angular' : 'html',
    },
  },
  {
    name       : 'noa/format/css',
    files      : ['**/*.css', '**/*.{p,post}css'],
    fileParser : plainParser,
    options : {
      parser : 'css',
    },
  },
  {
    name       : 'noa/format/scss',
    files      : ['**/*.scss'],
    fileParser : plainParser,
    options : {
      parser : 'scss',
    },
  },
  {
    name       : 'noa/format/less',
    files      : ['**/*.less'],
    fileParser : plainParser,
    options : {
      parser : 'less',
    },
  },
  {
    name       : 'noa/format/markdown',
    files      : ['**/*.md'],
    fileParser : plainParser,
    options : {
      parser : 'markdown',
    },
  },
  {
    name       : 'noa/format/graphql',
    files      : ['**/*.{g,graph}ql'],
    fileParser : plainParser,
    options : {
      parser : 'graphql',
    },
  },
  {
    name       : 'noa/format/xml',
    files      : ['**/*.xml'],
    fileParser : plainParser,
    options : {
      parser  : 'xml',
      plugins : ['@prettier/plugin-xml'],
    },
  },
  {
    name       : 'noa/format/svg',
    files      : ['**/*.svg'],
    fileParser : plainParser,
    options : {
      parser  : 'xml',
      plugins : ['@prettier/plugin-xml'],
    },
  },
]

// Default Prettier Settings
const defaultOptions : PrettierOptions = {
  printWidth    : 100,
  tabWidth      : 2,
  useTabs       : false,
  semi          : false,
  singleQuote   : true,
  trailingComma : 'all',
  endOfLine     : 'lf',
}

const defaultXmlOptions : PrettierOptions = {
  xmlQuoteAttributes       : 'double',
  xmlSelfClosingSpace      : true,
  xmlSortAttributesByKey   : false,
  xmlWhitespaceSensitivity : 'ignore',
}

function prettier(options : PrettierOptions = {}) : Linter.Config[] {
  const prettierOptions = { ...defaultOptions, ...defaultXmlOptions, ...options }
  const configs : Linter.Config[] = [
    {
      name    : 'noa/format/init',
      plugins : {
        format : plugin,
      },
    },
  ]

  // Prettier Css Setup
  for (const setup of setups) {
    configs.push({
      name  : setup.name,
      files : setup.files,
      languageOptions : {
        parser : setup.fileParser,
      },
      rules : {
        'format/prettier' : ['warn', { ...prettierOptions, ...setup.options }],
      },
    })
  }

  return configs
}

export default prettier
