import isEqual from "react-fast-compare"
import {
  filterUndefined,
  memoizedGet as get,
  mergeWith,
  runIfFn,
  omit,
  isFunction,
  isArray,
} from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils";
import React from "react";

type ThemeProviderContext = any 

const [
  ThemeProvider,
  useTheme,
] = createContext<ThemeProviderContext>({
  strict: false,
  name: "ThemeContext",
})

const componentChunkHasFunction = (chunk: unknown) => isFunction(chunk) || (isArray(chunk) && chunk.some(x => isFunction(x)))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HierarchicalThemeProvider({themeOverride, children}: {themeOverride: any; children?: React.ReactNode;}) {
  const theme = useTheme()

  // Theme shouldn't contain [Function, ...] other then component chunks
  return (
    <ThemeProvider value={mergeWith(theme, themeOverride, (objValue: unknown, srcValue: unknown) => {
      if (componentChunkHasFunction(objValue) || componentChunkHasFunction(srcValue)) {
        return (isArray(srcValue) ? srcValue : [srcValue,]).concat(isArray(objValue) ? objValue : [objValue,]);
      }
    })}>
      {children}
    </ThemeProvider>
  )
}

/**
 * It's className
 */
type Style = string

type GetComponentStyle<TComponentProps, TTheme extends ThemeBase, TVariant extends string, TSize extends string, TParts extends string | never> = TParts extends never ? Style : Record<TParts, Style> | ((options: {componentProps: TComponentProps; variant: TVariant; size: TSize; colorScheme: TTheme['colorScheme'] }) => TParts extends never ? Style: Record<TParts, Style>);

export interface Theme {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: Record<'variants' | 'sizes' | 'base', GetComponentStyle<unknown, Theme, string, string, any>> & {defaults: Record<'variants' | 'sizes' | 'colorScheme', string>; parts?: never | string[]};
  colorScheme: string;
}

interface ThemingProps<TTheme extends ThemeBase, TComponent extends string> {
  variant?: TComponent extends keyof TTheme["components"]
    ? TTheme["components"][TComponent]["variants"]
    : string
  size?: TComponent extends keyof TTheme["components"]
    ? TTheme["components"][TComponent]["sizes"]
    : string
  colorScheme?: TTheme['colorScheme'];
}

export function useStyleConfig<TTheme extends ThemeBase, TComponent extends string>(
  themeKey: keyof TTheme['components'],
  props: ThemingProps<TTheme, TComponent>,
  styleConfig?: 
): Record<keyof TTheme["components"][TComponent], Style>

export function useStyleConfig<TTheme extends ThemeBase, TComponent extends string>(
  themeKey: keyof TTheme['components'],
  props: ThemingProps<TTheme, TComponent>,
): Style

export function useStyleConfig<TTheme extends ThemeBase, TComponent extends string>(themeKey: keyof TTheme['components'], props: ThemingProps<TTheme, TComponent>): Style | Record<string, Style> {
  const theme = useTheme()
  const themeStyleConfig = get(theme, `components.${themeKey}`)
  const styleConfig = styleConfigProp || themeStyleConfig

  const mergedProps = mergeWith(
    { theme, colorMode },
    styleConfig?.defaultProps ?? {},
    filterUndefined(omit(rest, ["children"])),
  )

  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */
  type StylesRef = SystemStyleObject | Record<string, SystemStyleObject>
  const stylesRef = useRef<StylesRef>({})

  if (styleConfig) {
    const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)

    const variants = runIfFn(
      styleConfig.variants?.[mergedProps.variant] ?? {},
      mergedProps,
    )

    const sizes = runIfFn(
      styleConfig.sizes?.[mergedProps.size] ?? {},
      mergedProps,
    )

    const styles = mergeWith({}, baseStyles, sizes, variants)

    if (styleConfig.parts) {
      styleConfig.parts.forEach((part: string) => {
        styles[part] = styles[part] ?? {}
      })
    }

    const isStyleEqual = isEqual(stylesRef.current, styles)

    if (!isStyleEqual) {
      stylesRef.current = styles
    }
  }

  return stylesRef.current
}

export function useMultiStyleConfig(themeKey: string, props: any) {
  return useStyleConfig(themeKey, props, { isMultiPart: true })
}