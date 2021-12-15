function cssVar(name: string) {
  // in case server side rendering
  return globalThis.getComputedStyle
    ? globalThis
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
    : '#000000'
}

export {cssVar}
