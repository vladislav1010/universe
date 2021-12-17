function cssVar(name: string) {
  // TODO: Is the check right?
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return globalThis.getComputedStyle
    ? globalThis
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
    : '#000000'
}

function setCssVar(name: string, value: string) {
  // TODO: Is the check right?
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!globalThis.document.documentElement) {
    return
  }

  globalThis.document.documentElement.style.setProperty(name, value)
}

export {cssVar, setCssVar}
