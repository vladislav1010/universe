import { useBoolean, useId } from "@chakra-ui/hooks"
import { cx, dataAttr, __DEV__ } from "@chakra-ui/utils"
import {
  createContext,
  mergeRefs,
  PropGetter,
  PropGetterV2,
} from "@chakra-ui/react-utils"
import * as React from "react"

export interface FormControlOptions {
  /**
   * If `true`, the form control will be required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-required` set to `true`
   */
  isRequired?: boolean
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean
  /**
   * If `true`, the form control will be readonly
   */
  isReadOnly?: boolean
}

interface FormControlContext extends FormControlOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string
}

type FormControlProviderContext = Omit<
  ReturnType<typeof useFormControlProvider>,
  "getRootProps" | "htmlProps"
>

const [
  FormControlProvider,
  useFormControlContext,
] = createContext<FormControlProviderContext>({
  strict: false,
  name: "FormControlContext",
})

type StylesProviderContext = Record<'container' | 'helperText', React.CSSProperties>;

const [StylesProvider, useStylesProvider] = createContext<StylesProviderContext>({
  strict: true,
  name: 'StylesContext'
})

export { useFormControlContext, StylesProvider }

function useFormControlProvider(props: FormControlContext) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...htmlProps
  } = props

  // Generate all the required ids
  const uuid = useId()
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const id = idProp || `field-${uuid}`

  const labelId = `${id}-label`
  const feedbackId = `${id}-feedback`
  const helpTextId = `${id}-helptext`

  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */
  const [hasFeedbackText, setHasFeedbackText] = React.useState(false)

  /**
   * Track whether the `FormHelperText` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */
  const [hasHelpText, setHasHelpText] = React.useState(false)

  // Track whether the form element (e.g, `input`) has focus.
  const [isFocused, setFocus] = useBoolean()

  const getHelpTextProps = React.useCallback<PropGetter>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (props = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props,
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return
        setHasHelpText(true)
      }),
    }),
    [helpTextId],
  )

  const getLabelProps = React.useCallback<PropGetterV2<"label">>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: props.id ?? labelId,
      htmlFor: props.htmlFor ?? id,
    }),
    [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId],
  )

  const getErrorMessageProps = React.useCallback<PropGetter>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (props = {}, forwardedRef = null) => ({
      id: feedbackId,
      ...props,
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return
        setHasFeedbackText(true)
      }),
      "aria-live": "polite",
    }),
    [feedbackId],
  )

  const getRootProps = React.useCallback<PropGetterV2<"div">>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (props = {}, forwardedRef = null) => ({
      ...props,
      ...htmlProps,
      ref: forwardedRef,
      role: "group",
    }),
    [htmlProps],
  )

  const getRequiredIndicatorProps = React.useCallback<PropGetter>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      role: "presentation",
      "aria-hidden": true,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      children: props.children || "*",
    }),
    [],
  )

  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps,
  }
}

export interface FormControlProps
  extends React.ComponentPropsWithoutRef<"div">,
    FormControlContext {}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */
export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>((props, ref) => {
  const styles = useStylesProvider()
  const { getRootProps, htmlProps: _, ...context } = useFormControlProvider(
    props,
  )

  const className = cx("chakra-form-control", props.className)
  const contextValue = React.useMemo(() => context, [context])

  return (
    <FormControlProvider value={contextValue}>
        <div
          {...getRootProps({}, ref)}
          className={className}
          style={styles.container}
        />
    </FormControlProvider>
  )
})

if (__DEV__) {
  FormControl.displayName = "FormControl"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HelpTextProps extends React.ComponentPropsWithoutRef<"div"> {}

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = React.forwardRef<HTMLDivElement, HelpTextProps>((props, ref) => {
  const field = useFormControlContext()
  const styles = useStylesProvider()
  const className = cx("chakra-form__helper-text", props.className)
  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      {...field?.getHelpTextProps(props, ref)}
      style={styles.helperText}
      className={className}
    />
  )
})

if (__DEV__) {
  FormHelperText.displayName = "FormHelperText"
}