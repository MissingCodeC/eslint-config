import type { Linter } from 'eslint'

/* ALL CONFIGURABLE OPTIONS FOR PRETTIER PLUGIN */
export type PrettierOptions = {
  experimentalTernaries?        : boolean
  experimentalOperatorPosition? : 'start' | 'end'
  printWidth?                   : number
  tabWidth?                     : number
  useTabs?                      : boolean
  semi?                         : boolean
  singleQuote?                  : boolean
  quoteProps?                   : 'as-needed' | 'consistent' | 'preserve'
  jsxSingleQuote?               : boolean
  trailingComma?                : 'all' | 'es5' | 'none'
  bracketSpacing?               : boolean
  objectWrap?                   : 'preserve' | 'collapse'
  bracketSameLine?              : boolean
  proseWrap?                    : 'always' | 'never' | 'preserve'
  htmlWhitespaceSensitivity?    : 'css' | 'strict' | 'ignore'
  endOfLine?                    : 'lf' | 'crlf' | 'cr' | 'auto'
  embeddedLanguageFormatting?   : 'off' | 'auto'
  singleAttributePerLine?       : boolean
  xmlQuoteAttributes?           : 'preserve' | 'single' | 'double'
  xmlSelfClosingSpace?          : boolean
  xmlSortAttributesByKey?       : boolean
  xmlWhitespaceSensitivity?     : 'strict' | 'preserve' | 'ignore'
}

/* FORMATTERS SETUP CONFIGURATION */
export type FormatterSutup = {
  name       : string
  files      : string[]
  fileParser : Linter.Parser
  options : {
    parser   : string
    plugins? : string[]
  } & PrettierOptions
}

/* STYLISTIC PLUGIN OPTIONS */
export type StylisticOptions = {
  indent?        : number | 'tab'
  quotes?        : 'single' | 'double'
  semi?          : boolean
  trailingComma? : boolean
  endOfLine?     : 'unix' | 'windows'
}

export type TypescriptOptions = {
  typeAware? : boolean
  tsconfig?  : string
}

export type ConfigOptions = {
  typescript? : boolean | TypescriptOptions
  angular?    : boolean
  prettier?   : PrettierOptions
  stylistic?  : StylisticOptions
}
