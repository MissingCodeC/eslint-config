import type { Linter } from 'eslint'
import globals from 'globals'

import { isRunningInEditor } from '../utils'

function javascript() : Linter.Config[] {
  const isEditor = isRunningInEditor()

  return [
    {
      name            : 'noa/javascript/init',
      languageOptions : {
        ecmaVersion : 'latest',
        sourceType  : 'module',
        globals     : { ...globals.browser, ...globals.node },
        parserOptions : {
          ecmaFeatures : {
            jsx           : true,
            globalReturn  : false,
            impliedStrict : true,
          },
        },
      },
    },
    {
      name  : 'noa/javascript/rules',
      files : ['**/*.?([cm])js', '**/*.?([cm])jsx', '**/*.?([cm])ts', '**/*.?([cm])tsx'],
      rules : {
        /* Rules that prevent Errors */
        'array-callback-return'         : 'error', // Enforce return statements in array callbacks (map, filter, etc.)
        'constructor-super'             : 'error', // Require super() calls in constructors of derived classes
        'for-direction'                 : 'error', // Enforce correct for loop direction to avoid infinite loops
        'getter-return'                 : ['error', { allowImplicit : true }], // Enforce return statements in getters
        'no-async-promise-executor'     : 'error', // Disallow async function as Promise executor
        'no-class-assign'               : 'error', // Disallow reassigning class names
        'no-compare-neg-zero'           : 'error', // Disallow comparing against -0
        'no-cond-assign'                : ['error', 'always'], // Disallow assignment operators in conditional expressions
        'no-const-assign'               : 'error', // Disallow reassigning const variables
        'no-constant-binary-expression' : 'error', // Disallow expressions where operation doesn't affect value
        'no-constant-condition'         : 'error', // Disallow constant expressions in conditions
        'no-constructor-return'         : 'error', // Disallow returning value from constructor
        'no-dupe-args'                  : 'error', // Disallow duplicate arguments in function definitions
        'no-dupe-class-members'         : 'error', // Disallow duplicate class members
        'no-dupe-else-if'               : 'error', // Disallow duplicate conditions in if-else-if chains
        'no-dupe-keys'                  : 'error', // Disallow duplicate keys in object literals
        'no-duplicate-case'             : 'error', // Disallow duplicate case labels in switch statements
        'no-duplicate-imports'          : ['error', { allowSeparateTypeImports : true }], // Disallow duplicate module imports
        'no-empty-pattern'              : 'error', // Disallow empty destructuring patterns
        'no-ex-assign'                  : 'error', // Disallow reassigning exceptions in catch clauses
        'no-fallthrough'                : 'error', // Disallow fallthrough of case statements
        'no-func-assign'                : 'error', // Disallow reassigning function declarations
        'no-import-assign'              : 'error', // Disallow assigning to imported bindings
        'no-inner-declarations'         : ['error', 'functions', { blockScopedFunctions : 'disallow' }], // Disallow variable or function declarations in nested blocks
        'no-irregular-whitespace'       : [
          'error',
          { skipStrings : true, skipRegExps : true, skipTemplates : true },
        ], // Disallow irregular whitespace
        'no-loss-of-precision'         : 'error', // Disallow literal numbers that lose precision
        'no-new-native-nonconstructor' : 'error', // Disallow new operators with global non-constructor functions
        'no-obj-calls'                 : 'error', // Disallow calling global object properties as functions
        'no-promise-executor-return'   : 'error', // Disallow returning values from Promise executor functions
        'no-prototype-builtins'        : 'error', // Disallow calling some Object.prototype methods directly on objects
        'no-self-assign'               : 'error', // Disallow assignments where both sides are exactly the same
        'no-self-compare'              : 'error', // Disallow comparisons where both sides are exactly the same
        'no-setter-return'             : 'error', // Disallow returning values from setters
        'no-sparse-arrays'             : 'error', // Disallow sparse arrays
        'no-template-curly-in-string'  : 'warn', // Disallow template literal placeholder syntax in regular strings
        'no-this-before-super'         : 'error', // Disallow this/super before calling super() in constructors
        'no-unassigned-vars'           : 'error', // Disallow let or var variables that are read but never assigned
        'no-undef'                     : ['error', { typeof : true }], // Disallow use of undeclared variables unless mentioned in /* global */ comments
        'no-unexpected-multiline'      : 'error', // Disallow confusing multiline expressions
        'no-unmodified-loop-condition' : 'error', // Disallow unmodified loop conditions
        'no-unreachable'               : 'error', // Disallow unreachable statements after a return, throw, continue, or break statement
        'no-unreachable-loop'          : 'error', // Disallow loops with a body that allows only one iteration
        'no-unsafe-finally'            : 'error', // Disallow control flow statements in finally blocks
        'no-unsafe-negation'           : ['error', { enforceForOrderingRelations : true }], // Disallow negating the left operand of relational operators
        'no-unsafe-optional-chaining'  : 'error', // Disallow use of optional chaining in contexts where undefined behavior is not handled
        'no-use-before-define'         : 'error', // Disallow use of variables before they are defined
        'require-atomic-updates'       : 'error', // Disallow assignments that can lead to race conditions due to usage of await or yield
        'use-isnan'                    : 'error', // Require calls to isNaN() when checking for NaN
        'valid-typeof'                 : ['error', { requireStringLiterals : true }], // Enforce comparing typeof expressions against valid strings

        /* Rules that enforce Best-Practices */
        'accessor-pairs'               : 'off', // Enforce getter and setter pairs in objects and classes
        'block-scoped-var'             : 'error', // Enforce use of variables within the scope they are defined
        'consistent-return'            : ['error', { treatUndefinedAsUnspecified : true }], // Require return statements to either always or never specify values
        'consistent-this'              : ['warn', 'that'], // Enforce consistent naming when capturing the current execution context
        'default-case'                 : 'error', // Require default cases in switch statements
        'default-case-last'            : 'error', // Enforce default clauses in switch statements to be last
        'default-param-last'           : 'error', // Enforce default parameters to be last
        'dot-notation'                 : 'error', // Enforce dot notation whenever possible
        'eqeqeq'                       : ['error', 'always'], // Require the use of === and !==
        'func-names'                   : ['warn', 'never'], // Require or disallow named function expressions
        'grouped-accessor-pairs'       : ['warn', 'getBeforeSet'], // Require grouped accessor pairs in object literals and classes
        'guard-for-in'                 : 'warn', // Require for-in loops to include an if statement
        'init-declarations'            : 'off', // Require or disallow initialization in variable declarations
        'logical-assignment-operators' : ['warn', 'always'], // Require or disallow logical assignment operators
        'new-cap'                      : ['warn', { newIsCap : true, capIsNew : false }], // Require constructor names to begin with a capital letter
        'no-caller'                    : 'error', // Disallow the use of arguments.caller or arguments.callee
        'no-case-declarations'         : 'error', // Disallow lexical declarations in case clauses
        'no-delete-var'                : 'error', // Disallow deleting variables
        'no-eval'                      : 'error', // Disallow the use of eval()
        'no-extend-native'             : 'error', // Disallow extending native types
        'no-extra-bind'                : 'error', // Disallow unnecessary calls to .bind()
        'no-extra-boolean-cast'        : 'error', // Disallow unnecessary boolean casts
        'no-extra-label'               : 'error', // Disallow unnecessary labels
        'no-global-assign'             : 'error', // Disallow assignments to native objects or read-only global variables
        'no-implied-eval'              : 'error', // Disallow the use of eval()-like methods
        'no-invalid-this'              : 'error', // Disallow this keywords outside of classes or class-like objects
        'no-iterator'                  : 'error', // Disallow the use of the __iterator__ property
        'no-labels'                    : 'error', // Disallow labeled statements
        'no-lone-blocks'               : 'error', // Disallow unnecessary nested blocks
        'no-lonely-if'                 : 'error', // Disallow if statements as the only statement in else blocks
        'no-loop-func'                 : 'error', // Disallow functions created in loops
        'no-multi-assign'              : 'error', // Disallow use of chained assignment expressions
        'no-multi-str'                 : 'error', // Disallow multiline strings
        'no-new'                       : 'error', // Disallow new operators outside of assignments or comparisons
        'no-new-func'                  : 'error', // Disallow new operators with the Function object
        'no-new-wrappers'              : 'error', // Disallow new operators with the String, Number, and Boolean objects
        'no-object-constructor'        : 'error', // Disallow calls to the Object constructor without an argument
        'no-octal'                     : 'error', // Disallow octal literals
        'no-octal-escape'              : 'error', // Disallow octal escape sequences in string literals
        'no-proto'                     : 'error', // Disallow the use of the __proto__ property
        'no-redeclare'                 : 'error', // Disallow variable redeclaration
        'no-return-assign'             : 'error', // Disallow assignment operators in return statements
        'no-script-url'                : 'error', // Disallow javascript: urls
        'no-sequences'                 : 'error', // Disallow comma operators
        'no-shadow-restricted-names'   : 'error', // Disallow identifiers from shadowing restricted names
        'no-throw-literal'             : 'error', // Disallow throwing literals as exceptions
        'no-undef-init'                : 'error', // Disallow initializing variables to undefined
        'no-undefined'                 : 'error', // Disallow the use of undefined as an identifier
        'no-unneeded-ternary'          : 'warn', // Disallow ternary operators when simpler alternatives exist
        'no-unused-expressions'        : 'error', // Disallow unused expressions
        'no-useless-call'              : 'error', // Disallow unnecessary calls to .call() and .apply()
        'no-useless-catch'             : 'error', // Disallow unnecessary catch clauses
        'no-useless-computed-key'      : 'error', // Disallow unnecessary computed property keys in objects and classes
        'no-useless-concat'            : 'error', // Disallow unnecessary concatenation of literals or template literals
        'no-useless-constructor'       : 'error', // Disallow unnecessary constructors
        'no-useless-escape'            : 'error', // Disallow unnecessary escape characters
        'no-useless-rename'            : 'error', // Disallow renaming import, export, and destructured assignments to the same name
        'no-useless-return'            : 'error', // Disallow redundant return statements
        'no-var'                       : 'error', // Require let or const instead of var
        'no-void'                      : 'error', // Disallow void operators
        'no-with'                      : 'error', // Disallow with statements
        'no-empty'                     : isEditor ? 'off' : 'error', // Disallow empty block statements
        'prefer-object-has-own'        : 'warn', // Disallow use of Object.prototype.hasOwnProperty.call() and prefer use of Object.hasOwn()
        'prefer-object-spread'         : 'warn', // Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
        'prefer-promise-reject-errors' : ['error', { allowEmptyReject : false }], // Require using Error objects as Promise rejection reasons
        'prefer-rest-params'           : 'warn', // Require rest parameters instead of arguments
        'prefer-spread'                : 'warn', // Require spread operators instead of .apply()
        'prefer-template'              : 'warn', // Require template literals instead of string concatenation
        'require-await'                : 'error', // Disallow async functions which have no await expression
        'require-yield'                : 'error', // Require generator functions to contain yield
        'symbol-description'           : 'warn', // Require symbol descriptions
        'yoda'                         : 'warn', // Require or disallow "Yoda" conditions

        /* Some personal preferences */
        'arrow-body-style'      : ['warn', 'as-needed'], // Require braces around arrow function bodies only when needed
        'func-style'            : ['warn', 'declaration', { allowArrowFunctions : true }], // Enforce the consistent use of either function declarations or expressions
        'object-shorthand'      : ['warn', 'always'], // Require or disallow method and property shorthand syntax for object literals
        'one-var'               : ['warn', { initialized : 'never' }], // Enforce variables to be declared either together or separately in functions
        'prefer-arrow-callback' : 'warn', // Require using arrow functions for callbacks

        /* These rules that should be disabled during development but active otherwise */
        'complexity'                      : isEditor ? 'off' : ['warn', 10], // Enforce a maximum cyclomatic complexity allowed in a program
        'max-depth'                       : isEditor ? 'off' : ['warn', 4], // Enforce a maximum depth that blocks can be nested
        'max-nested-callbacks'            : isEditor ? 'off' : ['warn', 3], // Enforce a maximum depth that callbacks can be nested
        'max-lines'                       : isEditor ? 'off' : ['warn', { max : 500, skipBlankLines : true, skipComments : true }], // Enforce a maximum number of lines per file
        'max-lines-per-function'          : isEditor ? 'off' : ['warn', { max : 100, skipBlankLines : true, skipComments : true }], // Enforce a maximum number of lines of code in a function
        'max-classes-per-file'            : isEditor ? 'off' : ['warn', 1], // Enforce a maximum number of classes per file
        'max-params'                      : isEditor ? 'off' : ['warn', 4], // Enforce a maximum number of parameters in function definitions
        'max-statements'                  : isEditor ? 'off' : ['warn', 20], // Enforce a maximum number of statements allowed in function blocks
        'no-unused-private-class-members' : isEditor ? 'off' : 'error', // Disallow unused private class members
        'no-unused-vars'                  : isEditor ? 'off' : 'error', // Disallow unused variables
        'no-useless-assignment'           : isEditor ? 'off' : 'error', // Disallow variable assignments when the value is not used
        'no-debugger'                     : isEditor ? 'off' : 'error', // Disallow debugger statements
        'no-alert'                        : isEditor ? 'off' : 'error', // Disallow the use of alert, confirm, and prompt
        'no-console'                      : isEditor ? 'off' : 'error', // Disallow the use of console
        'no-empty-function'               : isEditor ? 'off' : 'error', // Disallow empty functions
        'no-empty-static-block'           : isEditor ? 'off' : 'error', // Disallow empty static blocks
        'prefer-const'                    : isEditor ? 'off' : ['warn', { destructuring : 'all' }], // Require const declarations for variables that are never reassigned after declared
      },
    },
  ] as Linter.Config[]
}

export default javascript
