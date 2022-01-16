import {useId} from '@chakra-ui/hooks'
import clsx from 'clsx'
import * as React from 'react'
import {OutlineToggleButton} from './outline-toggle-button'
import {UseInputProps} from './use-input'
import useToggle from './use-toggle'

const Checkbox = ({
  input: controlledInput,
  onChange,
  initialInput,
  readOnly,
  title,
  rootClassName,
  ...inputProps
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'readOnly' | 'onChange' | 'value' | 'checked' | 'id'
> &
  UseInputProps<boolean> & {
    title: string
    rootClassName?: string
  }) => {
  const id = useId()

  const {getTogglerProps, input: isActive} = useToggle({
    input: controlledInput,
    onChange,
    initialInput,
    readOnly,
  })

  return (
    <div className={clsx(rootClassName, 'inline-flex')}>
      <label htmlFor={id} className="sr-only">
        {title}
      </label>
      <input
        id={id}
        type="checkbox"
        hidden
        {...inputProps}
        value={title}
        checked={isActive}
        readOnly
      />
      <OutlineToggleButton
        {...getTogglerProps({
          isActive,
        })}
      >
        {title}
      </OutlineToggleButton>
    </div>
  )
}

export default Checkbox
