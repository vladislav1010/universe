import * as React from 'react';
import warning from 'warning'

function useControlledSwitchWarning(
  controlPropValue: unknown,
  controlPropName: string,
  componentName: string,
) {
  const isControlled = controlPropValue != null
  const {current: wasControlled} = React.useRef(isControlled)

  React.useEffect(() => {
    warning(
      !(isControlled && !wasControlled),
      `\`${componentName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
    warning(
      !(!isControlled && wasControlled),
      `\`${componentName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
  }, [componentName, controlPropName, isControlled, wasControlled])
}

// eslint-disable-next-line max-params
function useOnChangeReadOnlyWarning(
  controlPropValue: unknown,
  controlPropName: string,
  componentName: string,
  hasOnChange: boolean,
  readOnly: boolean,
  readOnlyProp :string,
  initialValueProp: string,
  onChangeProp: string,
) {
  const isControlled = controlPropValue != null
  React.useEffect(() => {
    warning(
      !(!hasOnChange && isControlled && !readOnly),
      `A \`${controlPropName}\` prop was provided to \`${componentName}\` without an \`${onChangeProp}\` handler. This will result in a read-only \`${controlPropName}\` value. If you want it to be mutable, use \`${initialValueProp}\`. Otherwise, set either \`${onChangeProp}\` or \`${readOnlyProp}\`.`,
    )
  }, [
    componentName,
    controlPropName,
    isControlled,
    hasOnChange,
    readOnly,
    onChangeProp,
    initialValueProp,
    readOnlyProp,
  ])
}

export {useControlledSwitchWarning, useOnChangeReadOnlyWarning}