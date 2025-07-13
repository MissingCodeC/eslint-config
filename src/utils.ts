import { readFile } from 'node:fs/promises'

// TODO: build a prefered type definition rule to always use Type unless it contains a method
interface PackageDeps {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export async function isPackageInstalled(pkgName: string): Promise<boolean> {
  try {
    const pkg = JSON.parse(await readFile('package.json', 'utf-8')) as PackageDeps
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }

    return pkgName in deps
  } catch {
    return false
  }
}

export function isRunningInEditor(): boolean {
  if (process.env.CI || process.env.GITHUB_ACTIONS) return false
  if (process.env.GIT_PARAMS || process.env.VSCODE_GIT_COMMAND) return false

  return !!(process.env.VSCODE_PID
    || process.env.VSCODE_CWD
    || process.env.JETBRAINS_IDE
    || process.env.VIM
    || process.env.NVIM
  )
}

export const plainParser = {
  meta: {
    name: 'plain-parser',
  },
  parseForESLint: (text: string) => ({
    ast: {
      type: 'Program',
      body: [],
      comments: [],
      loc: { start: 0, end: text.length },
      range: [0, text.length],
      tokens: [],
    },
    scopeManager: null,
    visitorKeys: {},
  }),
}
