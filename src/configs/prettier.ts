import prettier from 'eslint-plugin-prettier'
import type { Linter } from 'eslint'
import { plainParser } from '../utils'

interface PrettierOptions {
  experimentalTernaries?: boolean
  experimentalOperatorPosition?: 'start' | 'end'
  printWidth?: number
  tabWidth?: number
  useTabs?: boolean
  semi?: boolean
  singleQuote?: boolean
  quoteProps?: 'as-needed' | 'consistent' | 'preserve'
  jsxSingleQuote?: boolean
  trailingComma?: 'all' | 'es5' | 'none'
  bracketSpacing?: boolean
  objectWrap?: 'preserve' | 'collapse'
  bracketSameLine?: boolean
  proseWrap?: 'always' | 'never' | 'preserve'
  htmlWhitespaceSensitivity?: 'css' | 'strict' | 'ignore'
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto'
  embeddedLanguageFormatting?: 'off' | 'auto'
  singleAttributePerLine?: boolean
  xmlQuoteAttributes?: 'preserve' | 'single' | 'double'
  xmlSelfClosingSpace?: boolean
  xmlSortAttributesByKey?: boolean
  xmlWhitespaceSensitivity?: 'strict' | 'preserve' | 'ignore'
}

interface FormatterSutup {
  name: string
  files: string[]
  options: {
    parser: string
    plugins?: string[]
  } & PrettierOptions
}

const setups: FormatterSutup[] = [
  {
    name: 'noa/format/html',
    files: ['**/*.htm?(l)'],
    options: {
      parser: 'html',
    },
  },
  {
    name: 'noa/format/css',
    files: ['**/*.css', '**/*.{p,post}css'],
    options: {
      parser: 'css',
    },
  },
  {
    name: 'noa/format/scss',
    files: ['**/*.scss'],
    options: {
      parser: 'scss',
    },
  },
  {
    name: 'noa/format/less',
    files: ['**/*.less'],
    options: {
      parser: 'less',
    },
  },
  {
    name: 'noa/format/markdown',
    files: ['**/*.md'],
    options: {
      parser: 'markdown',
    },
  },
  {
    name: 'noa/format/graphql',
    files: ['**/*.{g,graph}ql'],
    options: {
      parser: 'graphql',
    },
  },
  {
    name: 'noa/format/xml',
    files: ['**/*.xml'],
    options: {
      parser: 'xml',
      plugins: ['@prettier/plugin-xml'],
    },
  },
  {
    name: 'noa/format/svg',
    files: ['**/*.svg'],
    options: {
      parser: 'xml',
      plugins: ['@prettier/plugin-xml'],
    },
  },
]

// Default Prettier Settings
const defaultOptions: PrettierOptions = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
}

const defaultXmlOptions: PrettierOptions = {
  xmlQuoteAttributes: 'double',
  xmlSelfClosingSpace: true,
  xmlSortAttributesByKey: false,
  xmlWhitespaceSensitivity: 'ignore',
}

function formatter(options: PrettierOptions = {}): Linter.Config[] {
  const prettierOptions = { ...defaultOptions, ...defaultXmlOptions, ...options }
  const configs: Linter.Config[] = [
    {
      name: 'noa/format/init',
      plugins: {
        format: prettier,
      },
    },
  ]

  // Prettier Css Setup
  for (const setup of setups) {
    configs.push({
      name: setup.name,
      files: setup.files,
      languageOptions: {
        parser: plainParser,
      },
      rules: {
        'format/prettier': ['warn', { ...prettierOptions, ...setup.options }],
      },
    })
  }

  return configs
}

export default formatter
