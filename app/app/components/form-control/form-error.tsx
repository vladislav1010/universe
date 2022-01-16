/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {cx, __DEV__} from '@chakra-ui/utils'
import * as React from 'react'
import {useFormControlContext, useStylesProvider} from './form-control'

export type FormErrorMessageProps = React.ComponentPropsWithoutRef<'div'>

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FormErrorMessage = React.forwardRef<
  HTMLDivElement,
  FormErrorMessageProps
>((props, ref) => {
  const styles = useStylesProvider()
  const field = useFormControlContext()

  if (!field?.isInvalid) return null

  return (
    <div
      {...field?.getErrorMessageProps(props, ref)}
      className={cx(
        'chakra-form__error-message',
        props.className,
        'flex items-center',
        styles.formError?.text,
      )}
    />
  )
})

if (__DEV__) {
  FormErrorMessage.displayName = 'FormErrorMessage'
}

// to communicate error or success you should never rely only on color.
// For people with red-green color blindness a green and a red border look almost the same.
// It's impossible for them to see if there was an error or success. Add text or an icon to make it obvious.
/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */
export const FormErrorIcon = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<'svg'>
>((props, ref) => {
  const styles = useStylesProvider()
  const field = useFormControlContext()

  if (!field?.isInvalid) return null

  const _className = cx(
    'chakra-form__error-icon',
    props.className,
    styles.formError?.icon,
  )

  return (
    <svg
      ref={ref}
      aria-hidden
      {...props}
      className={_className}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
      />
    </svg>
  )
})

if (__DEV__) {
  FormErrorIcon.displayName = 'FormErrorIcon'
}
