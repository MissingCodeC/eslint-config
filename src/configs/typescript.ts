import type { Linter } from 'eslint'
import type * as TSESLint from 'typescript-eslint'

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import missingcodec from '@missingcodec/eslint-plugin'

import { isRunningInEditor } from '../utils'
import type { TypescriptOptions } from '../types'
const isEditor = isRunningInEditor()

/* RULES THAT NEED TO BE DISABLED */
const handledByTypeScript = {
  'no-dupe-keys'                 : 'off', // ts(1117)
  'no-func-assign'               : 'off', // ts(2630)
  'no-dupe-args'                 : 'off', // ts(2300)
  'no-unreachable'               : 'off', // ts(7027)
  'no-import-assign'             : 'off', // ts(2632) & ts(2540)
  'no-const-assign'              : 'off', // ts(2588)
  'no-class-assign'              : 'off', // ts(2629)
  'constructor-super'            : 'off', // ts(2335) & ts(2377)
  'no-this-before-super'         : 'off', // ts(2376) & ts(17009)
  'no-new-symbol'                : 'off', // ts(7009)
  'no-setter-return'             : 'off', // ts(2408)
  'no-obj-calls'                 : 'off', // ts(2349)
  'no-new-native-nonconstructor' : 'off', // ts(7009)
  'getter-return'                : 'off', // ts(2378)
  'no-undef'                     : 'off', // ts(2304) & ts(2552)
  'no-unsafe-negation'           : 'off', // ts(2365) & ts(2322) & ts(2358)
}

const extensionRulesDisable = {
  'class-methods-use-this' : 'off',
  'default-param-last'     : 'off',
  'init-declarations'      : 'off',
  'max-params'             : 'off',
  'no-array-constructor'   : 'off',
  'no-dupe-class-members'  : 'off',
  'no-empty-function'      : 'off',
  'no-invalid-this'        : 'off',
  'no-loop-func'           : 'off',
  'no-magic-numbers'       : 'off',
  'no-redeclare'           : 'off',
  'no-restricted-imports'  : 'off',
  'no-shadow'              : 'off',
  'no-unused-expressions'  : 'off',
  'no-unused-vars'         : 'off',
  'no-use-before-define'   : 'off',
  'no-useless-constructor' : 'off',
}

const extensionTypeAwareRulesDisable = {
  'consistent-return'            : 'off',
  'dot-notation'                 : 'off',
  'no-implied-eval'              : 'off',
  'only-throw-error'             : 'off',
  'prefer-destructuring'         : 'off',
  'prefer-promise-reject-errors' : 'off',
  'require-await'                : 'off',
}

/* TYPESCRIPT-ESLINT RULES */
const rules = {
  'ts/adjacent-overload-signatures'    : 'warn', // Require that function overload signatures be consecutive
  'ts/array-type'                      : ['warn', { default : 'array-simple' }], // Require consistently using either T[] or Array<T> for arrays
  'ts/ban-ts-comment'                  : ['error', { 'ts-expect-error' : 'allow-with-description' }], // Disallow @ts-<directive> comments or require descriptions after directives
  'ts/class-literal-property-style'    : ['warn', 'fields'], // Enforce that literals on classes are exposed in a consistent style
  'ts/consistent-generic-constructors' : ['warn', 'constructor'], // Enforce specifying generic type arguments on type annotation or constructor name of a constructor call
  'ts/consistent-indexed-object-style' : ['warn', 'record'], // Require or disallow the Record type
  'ts/consistent-type-assertions'      : ['warn', { assertionStyle : 'as' }], // Enforce consistent usage of type assertions
  'ts/consistent-type-definitions'     : 'off', // Enforce type definitions to consistently use either interface or type
  'ts/consistent-type-imports' : [
    'error',
    {
      prefer                  : 'type-imports',
      fixStyle                : 'separate-type-imports',
      disallowTypeAnnotations : false,
    },
  ], // Enforce consistent usage of type imports
  'ts/default-param-last' : 'error', // Enforce default parameters to be last
  // TODO: make a explicit-function-return-type rule which only targets named functions and class methods
  'ts/explicit-function-return-type'                : 'off', // Require explicit return types on functions and class methods
  'ts/explicit-member-accessibility'                : 'off', // Require explicit accessibility modifiers on class properties and methods
  'ts/explicit-module-boundary-types'               : 'off', // Require explicit return and argument types on exported functions' and classes' public class methods
  'ts/init-declarations'                            : 'off', // Require or disallow initialization in variable declarations
  'ts/max-params'                                   : isEditor ? 'off' : ['warn', { max : 4 }], // Enforce a maximum number of parameters in function definitions
  'ts/method-signature-style'                       : ['warn', 'method'], // Enforce using a particular method signature syntax
  'ts/no-dupe-class-members'                        : 'error', // Disallow duplicate class members
  'ts/no-duplicate-enum-values'                     : 'error', // Disallow duplicate enum member values
  'ts/no-empty-function'                            : 'error', // Disallow empty functions
  'ts/no-explicit-any'                              : 'off', // Disallow the any type
  'ts/no-extra-non-null-assertion'                  : 'error', // Disallow extra non-null assertions
  'ts/no-extraneous-class'                          : 'off', // Disallow classes used as namespaces
  'ts/no-import-type-side-effects'                  : 'error', // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
  'ts/no-invalid-void-type'                         : 'off', // Disallow void type outside of generic or return types
  'ts/no-loop-func'                                 : 'off', // Disallow function declarations that contain unsafe references inside loop statements
  'ts/no-magic-numbers'                             : 'off', // Disallow magic numbers
  'ts/no-non-null-asserted-nullish-coalescing'      : 'error', // Disallow non-null assertions in the left operand of a nullish coalescing operator
  'ts/no-non-null-asserted-optional-chain'          : 'error', // Disallow non-null assertions after an optional chain expression
  'ts/no-redeclare'                                 : 'error', // Disallow variable redeclaration
  'ts/no-unnecessary-parameter-property-assignment' : 'error', // Disallow unnecessary assignment of constructor property parameter
  'ts/no-unnecessary-type-constraint'               : 'error', // Disallow unnecessary constraints on generic types
  'ts/no-unsafe-declaration-merging'                : 'error', // Disallow unsafe declaration merging
  'ts/no-unsafe-function-type'                      : 'error', // Disallow using the unsafe built-in Function type
  'ts/no-unused-expressions'                        : 'error', // Disallow unused expressions
  'ts/no-unused-vars'                               : isEditor ? 'off' : 'error', // Disallow unused variables
  'ts/no-use-before-define'                         : 'error', // Disallow the use of variables before they are defined
  'ts/no-useless-constructor'                       : 'error', // Disallow unnecessary constructors
  'ts/no-useless-empty-export'                      : 'error', // Disallow empty exports that don't change anything in a module file
  'ts/no-wrapper-object-types'                      : 'error', // Disallow using confusing built-in primitive class wrappers
  'ts/prefer-literal-enum-member'                   : 'error', // Require all enum members to be literal values
  'ts/triple-slash-reference'                       : 'error', // Disallow certain triple slash directives in favor of ES6-style import declarations
}

const typeAwareRules = {
  'ts/await-thenable'                 : 'error', // Disallow awaiting a value that is not a Thenable
  'ts/consistent-return'              : ['error', { treatUndefinedAsUnspecified : true }], // Require return statements to either always or never specify values
  'ts/consistent-type-exports'        : 'error', // Enforce consistent usage of type exports
  'ts/dot-notation'                   : 'error', // Enforce dot notation whenever possible
  'ts/no-duplicate-type-constituents' : 'error', // Disallow duplicate constituents of union or intersection types
  'ts/no-floating-promises'           : 'error', // Require Promise-like statements to be handled appropriately
  'ts/no-for-in-array'                : 'error', // Disallow iterating over an array with a for-in loop
  'ts/no-implied-eval'                : 'error', // Disallow the use of eval()-like functions
  'ts/no-misused-promises'            : 'error', // Disallow Promises in places not designed to handle them
  'ts/no-misused-spread'              : 'error', // Disallow using the spread operator when it might cause unexpected behavior
  'ts/no-redundant-type-constituents' : 'error', // Disallow members of unions and intersections that do nothing or override type information
  'ts/no-unnecessary-type-assertion'  : 'error', // Disallow type assertions that do not change the type of an expression
  'ts/no-unsafe-argument'             : 'error', // Disallow calling a function with a value with type any
  'ts/no-unsafe-assignment'           : 'error', // Disallow assigning a value with type any to variables and properties
  'ts/no-unsafe-call'                 : 'error', // Disallow calling a value with type any
  'ts/no-unsafe-enum-comparison'      : 'error', // Disallow comparing an enum value with a non-enum value
  'ts/no-unsafe-member-access'        : 'error', // Disallow member access on a value with type any
  'ts/no-unsafe-return'               : 'error', // Disallow returning a value with type any from a function
  'ts/no-unsafe-type-assertion'       : 'off', // Disallow type assertions that narrow a type
  'ts/only-throw-error'               : 'error', // Disallow throwing non-Error values as exceptions
  'ts/prefer-promise-reject-errors'   : 'error', // Require using Error objects as Promise rejection reasons
  'ts/prefer-return-this-type'        : 'warn', // Enforce that this is used when only this type is returned
  'ts/promise-function-async'         : 'error', // Require any function or method that returns a Promise to be marked async
  'ts/require-await'                  : 'error', // Disallow async functions which do not return promises and have no await expression
  'ts/restrict-plus-operands'         : 'error', // Require both operands of addition to be the same type and be bigint, number, or string
  'ts/restrict-template-expressions'  : 'error', // Enforce template literal expressions to be of string type
  'ts/return-await'                   : ['error', 'in-try-catch'], // Enforce consistent awaiting of returned promises
  'ts/strict-boolean-expressions'     : 'off', // Disallow certain types in boolean expressions
  'ts/switch-exhaustiveness-check'    : 'error', // Require switch-case statements to be exhaustive
  'ts/unbound-method'                 : 'error', // Enforce unbound methods are called with their expected scope
}

async function typescript(options : TypescriptOptions = {}) {
  const tsconfig = options.tsconfig ?? resolve(process.cwd(), 'tsconfig.json')
  const isTypeAware = options.typeAware ?? existsSync(tsconfig)

  let tseslint : typeof TSESLint
  try {
    tseslint = await import('typescript-eslint')
  } catch {
    console.error('Package `typescript-eslint` not available.')
    return []
  }

  return [
    {
      name    : 'noa/typescript/init',
      plugins : {
        ts  : tseslint.plugin,
        noa : missingcodec,
      },
    },
    {
      name  : 'noa/typescript/disables',
      files : ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
      rules : {
        ...handledByTypeScript,
        ...extensionRulesDisable,
        ...(isTypeAware ? extensionTypeAwareRulesDisable : {}),
      },
    },
    {
      name  : 'noa/typescript/rules',
      files : ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
      languageOptions : {
        sourceType : 'module',
        parser     : tseslint.parser,
        parserOptions : {
          sourceType          : 'module',
          extraFileExtensions : [], // might need it later
          ...(isTypeAware
            ? {
              projectService  : {
                allowDefaultProject : ['*.?([cm])js', '*.?([cm])ts'],
                defaultProject      : 'tsconfig.json',
              },
              tsconfigRootDir : process.cwd(),
            }
            : {}
          ),
        },
      },
      rules : {
        ...rules,
        ...(isTypeAware ? typeAwareRules : {}),
        'noa/consistent-type-definitions' : 'warn',
      },
    },
  ] as Linter.Config[]
}

export default typescript
