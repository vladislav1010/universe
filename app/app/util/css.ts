function cssVar(name: string) {
  // in case server side rendering
  return globalThis.getComputedStyle
    ? globalThis
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
    : '#000000'
}

function setCssVar(name: string, value: string) {
  if (!globalThis.document.documentElement) {
    return
  }

  globalThis.document.documentElement.style.setProperty(name, value)
}

export {cssVar, setCssVar}
