export function isPackageAvailable(pkgName : string) : boolean {
  try {
    require.resolve(pkgName)
    return true
  } catch { return false }
}

export function isRunningInEditor() : boolean {
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
  meta : {
    name : 'plain-parser',
  },
  parseForESLint : (text : string) => ({
    ast          : {
      type     : 'Program',
      body     : [],
      comments : [],
      loc      : { start : 0, end : text.length },
      range    : [0, text.length],
      tokens   : [],
    },
    scopeManager : null,
    visitorKeys  : {},
  }),
}
