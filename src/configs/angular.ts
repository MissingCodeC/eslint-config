import type { Linter } from 'eslint'
import type * as TSESLint from 'typescript-eslint'
import type * as NGESLint from 'angular-eslint'

import { isRunningInEditor } from '../utils'
const isEditor = isRunningInEditor()

async function angular() {

  let tseslint : typeof TSESLint
  let ngeslint : typeof NGESLint
  try {
    tseslint = await import('typescript-eslint')
    ngeslint = await import('angular-eslint')
  } catch(err : unknown) {
    console.error('Package `typescript-eslint | angular-eslint` not available.')
    return []
  }

  return [
    {
      name    : 'noa/angular/init',
      plugins : {
        'ng'          : ngeslint.tsPlugin,
        'ng-template' : ngeslint.templatePlugin,
      },
    },
    {
      name  : 'noa/angular/rules',
      files : ['**/*.ts'],
      languageOptions : {
        parser     : tseslint.parser,
        sourceType : 'module',
      },
      processor : ngeslint.processInlineTemplates,
      rules : {
        'ng/component-class-suffix' : 'error',
        'ng/component-selector' : [
          'error',
          {
            type   : 'element',
            prefix : 'app',
            style  : 'kebab-case',
          },
        ],
        'ng/consistent-component-styles' : 'off',
        'ng/contextual-decorator'        : 'error',
        'ng/contextual-lifecycle'        : 'error',
        'ng/directive-class-suffix'      : 'error',
        'ng/directive-selector' : [
          'error',
          {
            type   : 'attribute',
            prefix : 'app',
            style  : 'camelCase',
          },
        ],
        'ng/no-async-lifecycle-method'                 : 'error',
        'ng/no-conflicting-lifecycle'                  : 'error',
        'ng/no-developer-preview'                      : 'error',
        'ng/no-duplicates-in-metadata-arrays'          : 'error',
        'ng/no-empty-lifecycle-method'                 : isEditor ? 'off' : 'error',
        'ng/no-experimental'                           : 'error',
        'ng/no-forward-ref'                            : 'off',
        'ng/no-inputs-metadata-property'               : 'off',
        'ng/no-lifecycle-call'                         : 'error',
        'ng/no-output-native'                          : 'error',
        'ng/no-outputs-metadata-property'              : 'off',
        'ng/no-pipe-impure'                            : 'off',
        'ng/no-queries-metadata-property'              : 'off',
        'ng/no-uncalled-signals'                       : 'error',
        'ng/prefer-inject'                             : 'error',
        'ng/prefer-on-push-component-change-detection' : 'off',
        'ng/prefer-output-emitter-ref'                 : 'off',
        'ng/prefer-output-readonly'                    : 'off',
        'ng/prefer-signals'                            : 'warn',
        'ng/prefer-standalone'                         : 'warn',
        'ng/relative-url-prefix'                       : 'error',
        'ng/require-lifecycle-on-prototype'            : 'error',
        'ng/require-localize-metadata'                 : 'off',
        'ng/runtime-localize'                          : 'off',
        'ng/sort-keys-in-type-decorator'               : 'warn',
        'ng/sort-lifecycle-methods'                    : 'warn',
        'ng/use-component-selector'                    : 'off',
        'ng/use-component-view-encapsulation'          : 'off',
        'ng/use-injectable-provided-in'                : 'off',
        'ng/use-lifecycle-interface'                   : 'error',
        'ng/use-pipe-transform-interface'              : 'error',
      },
    },
    {
      name  : 'noa/angular/template/rules',
      files : ['**/*.html'],
      languageOptions : {
        parser : ngeslint.templateParser,
      },
      rules : {
        'ng-template/alt-text'                        : 'off',
        'ng-template/attributes-order'                : 'warn',
        'ng-template/banana-in-box'                   : 'error',
        'ng-template/button-has-type'                 : 'off',
        'ng-template/elements-content'                : 'off',
        'ng-template/eqeqeq'                          : 'error',
        'ng-template/i18n'                            : 'off',
        'ng-template/interactive-supports-focus'      : 'off',
        'ng-template/label-has-associated-control'    : 'off',
        'ng-template/mouse-events-have-key-events'    : 'off',
        'ng-template/no-any'                          : 'off',
        'ng-template/no-autofocus'                    : 'off',
        'ng-template/no-duplicate-attributes'         : 'error',
        'ng-template/no-inline-styles'                : 'off',
        'ng-template/no-interpolation-in-attributes'  : 'off',
        'ng-template/no-negated-async'                : 'error',
        'ng-template/no-nested-tags'                  : 'off',
        'ng-template/no-positive-tabindex'            : 'off',
        'ng-template/prefer-at-empty'                 : 'off',
        'ng-template/prefer-contextual-for-variables' : 'warn',
        'ng-template/prefer-control-flow'             : 'warn',
        'ng-template/prefer-ngsrc'                    : 'off',
        'ng-template/prefer-self-closing-tags'        : 'warn',
        'ng-template/prefer-static-string-properties' : 'off',
        'ng-template/prefer-template-literal'         : 'warn',
        'ng-template/role-has-required-aria'          : 'off',
        'ng-template/table-scope'                     : 'off',
        'ng-template/use-track-by-function'           : 'off',
        'ng-template/valid-aria'                      : 'off',
      },
    },
  ] as Linter.Config[]
}

export default angular
