import type { Linter } from 'eslint'
import plugin from '@stylistic/eslint-plugin'
import missingcodec from '@missingcodec/eslint-plugin'

import type { StylisticOptions } from '../types'

const defaultOptions : StylisticOptions = {
  indent        : 2,
  quotes        : 'single',
  semi          : false,
  trailingComma : true,
  endOfLine     : 'unix',
}

function stylistic(options : StylisticOptions = {}) {
  const configuration = { ...defaultOptions, ...options }

  return [
    {
      name    : 'noa/stylistic/init',
      plugins : {
        style : plugin,
        noa   : missingcodec,
      },
    },
    {
      name  : 'noa/stylistic/rules',
      files : ['**/*.?([cm])js', '**/*.?([cm])jsx', '**/*.?([cm])ts', '**/*.?([cm])tsx'],
      rules : {
        /* General stylistic rules */
        'style/indent'                  : ['warn', configuration.indent], // Enforce consistent indentation
        'style/no-tabs'                 : ['warn', { allowIndentationTabs : true }], // Disallow all tabs
        'style/quotes'                  : ['warn', configuration.quotes, { avoidEscape : true, allowTemplateLiterals : true }], // Enforce the consistent use of either backticks, double, or single quotes
        'style/semi'                    : ['warn', configuration.semi ? 'always' : 'never'], // Require or disallow semicolons instead of ASI
        'style/comma-dangle'            : ['warn', configuration.trailingComma ? 'always-multiline' : 'never'], // Require or disallow trailing commas
        'style/linebreak-style'         : ['warn', configuration.endOfLine], // Enforce consistent linebreak style
        'style/brace-style'             : ['warn', '1tbs', { allowSingleLine : true }], // Enforce consistent brace style for blocks
        'style/multiline-ternary'       : ['warn', 'always-multiline'], // Enforce newlines between operands of ternary expressions
        'style/arrow-parens'            : ['warn', 'as-needed'], // Require parentheses around arrow function arguments
        'style/eol-last'                : ['warn', 'always'], // Require or disallow newline at the end of files
        'style/no-multiple-empty-lines' : ['warn', { max : 1, maxBOF : 0, maxEOF : 1 }], // Disallow multiple empty lines
        'style/no-trailing-spaces'      : 'warn', // Disallow trailing whitespace at the end of lines

        /* Advanced stylistic rules */
        // SPACING
        'style/array-bracket-spacing'     : ['warn', 'never'], // Enforce consistent spacing inside array brackets
        'style/arrow-spacing'             : ['warn', { before : true, after : true }], // Enforce consistent spacing before and after the arrow in arrow functions
        'style/block-spacing'             : ['warn', 'always'], // Disallow or enforce spaces inside of blocks after opening block and before closing block
        'style/comma-spacing'             : ['warn', { before : false, after : true }], // Enforce consistent spacing before and after commas
        'style/computed-property-spacing' : ['warn', 'never', { enforceForClassMembers : true }], // Enforce consistent spacing inside computed property brackets
        'style/function-call-spacing'     : ['warn', 'never'], // Require or disallow spacing between function identifiers and their invocations
        'style/generator-star-spacing'    : ['warn', { before : true, after : false }], // Enforce consistent spacing around `*` operators in generator functions
        'style/key-spacing'               : ['warn', {
          beforeColon : true,
          afterColon  : true,
          mode        : 'minimum',
        }], // Enforce consistent spacing between property names and type annotations in types and interfaces
        'style/keyword-spacing'               : ['warn', { before : true, after : true }], // Enforce consistent spacing before and after keywords
        'style/object-curly-spacing'          : ['warn', 'always'], // Enforce consistent spacing inside braces
        'style/rest-spread-spacing'           : ['warn', 'never'], // Enforce spacing between rest and spread operators and their expressions
        'style/semi-spacing'                  : ['warn', { before : false, after : true }], // Enforce consistent spacing before and after semicolons
        'style/space-before-blocks'           : 'warn', // Enforce consistent spacing before blocks
        'style/space-before-function-paren'   : ['warn', { anonymous : 'never', asyncArrow : 'always', named : 'never', catch : 'never' }], // Enforce consistent spacing before function parenthesis
        'style/space-in-parens'               : ['warn', 'never'], // Enforce consistent spacing inside parentheses
        'style/space-infix-ops'               : 'warn', // Require spacing around infix operators
        'style/space-unary-ops'               : ['warn', { words : true, nonwords : false }], // Enforce consistent spacing before or after unary operators
        'style/switch-colon-spacing'          : ['warn', { before : false, after : true }], // Enforce spacing around colons of switch statements
        'style/template-curly-spacing'        : ['warn', 'always'], // Require or disallow spacing around embedded expressions of template strings
        'style/template-tag-spacing'          : ['warn', 'never'], // Require or disallow spacing between template tags and their literals
        'style/type-annotation-spacing'       : 'off', // Require consistent spacing around type annotations
        'style/type-generic-spacing'          : 'warn', // Enforces consistent spacing inside TypeScript type generics
        'style/type-named-tuple-spacing'      : 'warn', // Expect space before the type declaration in the named tuple
        'style/yield-star-spacing'            : ['warn', 'before'], // Require or disallow spacing around the `*` in `yield*` expressions
        'style/no-mixed-spaces-and-tabs'      : 'warn', // Disallow mixed spaces and tabs for indentation
        'style/no-whitespace-before-property' : 'warn', // Disallow whitespace before properties

        // LINEBREAKS
        'style/array-bracket-newline'          : ['warn', 'consistent'], // Enforce linebreaks after opening and before closing array brackets
        'style/array-element-newline'          : ['warn', 'consistent'], // Enforce line breaks after each array element
        'style/curly-newline'                  : ['error', { consistent : true }], // Enforce consistent line breaks after opening and before closing braces
        'style/dot-location'                   : ['warn', 'property'], // Enforce consistent newlines before and after dots
        'style/function-call-argument-newline' : ['warn', 'consistent'], // Enforce line breaks between arguments of a function call
        'style/function-paren-newline'         : ['warn', 'multiline-arguments'], // Enforce consistent line breaks inside function parentheses
        'style/object-curly-newline'           : ['warn', { consistent : true }], // Enforce consistent line breaks after opening and before closing braces
        'style/object-property-newline'        : ['warn', { allowAllPropertiesOnSameLine : true }], // Enforce placing object properties on separate lines
        'style/operator-linebreak'             : ['warn', 'before'], // Enforce consistent linebreak style for operators

        // POSITIONING
        'style/semi-style'  : ['warn', 'last'], // Enforce location of semicolons
        'style/comma-style' : ['warn', 'last'], // Enforce consistent comma style
        'style/member-delimiter-style' : ['warn', {
          multilineDetection : 'brackets',
          multiline          : {
            delimiter   : 'none',
            requireLast : false,
          },
          singleline : {
            delimiter   : 'comma',
            requireLast : false,
          },
        }], // Require a specific member delimiter style for interfaces and type literals

        // OTHERS
        'style/indent-binary-ops' : ['warn', configuration.indent], // Indentation for binary operators
        'style/lines-between-class-members' : ['warn', { enforce : [
          { blankLine : 'always', prev : '*', next : 'method' },
          { blankLine : 'always', prev : 'method', next : '*' },
          { blankLine : 'never', prev : 'field', next : 'field' },
        ] }, {
          exceptAfterSingleLine : true,
          exceptAfterOverload   : true,
        }], // Require or disallow an empty line between class members
        'style/max-statements-per-line' : ['warn', { max : 1 }], // Enforce a maximum number of statements allowed per line
        'style/new-parens'              : ['warn', 'always'], // Enforce or disallow parentheses when invoking a constructor with no arguments
        'style/no-extra-parens'         : ['warn', 'functions'], // Disallow unnecessary parentheses
        'style/no-extra-semi'           : 'warn', // Disallow unnecessary semicolons
        'style/no-floating-decimal'     : 'warn', // Disallow leading or trailing decimal points in numeric literals
        'style/no-mixed-operators'      : ['warn', {
          allowSamePrecedence : true,
          groups : [
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],
        }], // Disallow mixed binary operators
        'style/one-var-declaration-per-line' : ['warn', 'initializations'], // Require or disallow newlines around variable declarations
        // 'style/padding-line-between-statements' : [
        //   'warn',
        //   { blankLine : 'always', prev : ['const', 'let', 'var'], next : '*' },
        //   { blankLine : 'any', prev : ['const', 'let', 'var'], next : ['const', 'let', 'var'] },
        //   { blankLine : 'always', prev : '*', next : 'return' },
        //   { blankLine : 'always', prev : 'directive', next : '*' },
        //   { blankLine : 'any', prev : 'directive', next : 'directive' },
        // ], // Require or disallow padding lines between statements
        'style/quote-props'    : ['warn', 'consistent-as-needed'], // Require quotes around object literal, type literal, interfaces and enums property names
        'style/wrap-iife'      : ['warn', 'inside', { functionPrototypeMethods : true }], // Require parentheses around immediate `function` invocations
        'style/spaced-comment' : 'warn', // Enforce consistent spacing after the `//` or `/*` in a comment

        /* Jsx related Rules */
        'style/jsx-closing-bracket-location' : 'warn', // Enforce closing bracket location in JSX
        'style/jsx-closing-tag-location'     : 'warn', // Enforce closing tag location for multiline JSX
        'style/jsx-curly-brace-presence'     : ['warn', { propElementValues : 'always' }], // Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes
        'style/jsx-curly-newline'            : 'warn', // Enforce consistent linebreaks in curly braces in JSX attributes and expressions
        'style/jsx-curly-spacing'            : ['warn', 'always'], // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
        'style/jsx-equals-spacing'           : ['warn', 'never'], // Enforce or disallow spaces around equal signs in JSX attributes
        'style/jsx-first-prop-new-line'      : ['warn', 'multiline'], // Enforce proper position of the first property in JSX
        'style/jsx-function-call-newline'    : ['warn', 'multiline'], // Enforce line breaks before and after JSX elements when they are used as arguments to a function.
        'style/jsx-indent-props'             : ['warn', 2], // Enforce props indentation in JSX
        'style/jsx-max-props-per-line'       : ['warn', { maximum : 1, when : 'multiline' }], // Enforce maximum of props on a single line in JSX
        'style/jsx-one-expression-per-line'  : ['warn', { allow : 'single-child' }], // Require one JSX element per line
        'style/jsx-props-no-multi-spaces'    : 'warn', // Disallow multiple spaces between inline JSX props
        'style/jsx-quotes'                   : ['warn', 'prefer-double'], // Enforce the consistent use of either double or single quotes in JSX attributes
        'style/jsx-tag-spacing'              : ['warn', {
          afterOpening      : 'never',
          beforeClosing     : 'never',
          beforeSelfClosing : 'always',
          closingSlash      : 'never',
        }], // Enforce whitespace in and around the JSX opening and closing brackets
        'style/jsx-wrap-multilines' : ['warn', {
          arrow         : 'parens-new-line',
          assignment    : 'parens-new-line',
          condition     : 'parens-new-line',
          declaration   : 'parens-new-line',
          logical       : 'parens-new-line',
          prop          : 'parens-new-line',
          propertyValue : 'parens-new-line',
          return        : 'parens-new-line',
        }], // Disallow missing parentheses around multiline JSX

        'noa/type-annotation-spacing' : 'warn',
        'noa/vertical-alignment'      : 'warn',
      },
    },
  ] as Linter.Config[]
}

export default stylistic
