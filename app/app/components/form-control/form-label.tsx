/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useFormControlContext, useStylesProvider } from "./form-control"

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {
  /**
   * @type React.ReactElement
   */
  requiredIndicator?: React.ReactElement
}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const styles = useStylesProvider()

    const {
      className,
      children,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      requiredIndicator = <RequiredIndicator />,
      ...rest
    } = props

    const field = useFormControlContext()
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest }

    return (
      <label
        {...ownProps}
        className={cx("chakra-form__label", props.className)}
        style={{
          display: "block",
          textAlign: "start",
          ...styles,
        }}
      >
        {children}
        {field?.isRequired ? requiredIndicator : null}
      </label>
    )
  },
)

if (__DEV__) {
  FormLabel.displayName = "FormLabel"
}

export type RequiredIndicatorProps = React.ComponentPropsWithoutRef<'span'>

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = React.forwardRef<HTMLSpanElement, RequiredIndicatorProps>(
  (props, ref) => {
    const field = useFormControlContext()
    const styles = useStylesProvider()

    if (!field?.isRequired) return null

    const className = cx("chakra-form__required-indicator", props.className)

    return (
      <span
        {...field?.getRequiredIndicatorProps(props, ref)}
        style={styles.requiredIndicator}
        className={className}
      />
    )
  },
)

if (__DEV__) {
  RequiredIndicator.displayName = "RequiredIndicator"
}