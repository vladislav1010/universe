import clsx from 'clsx'
import * as React from 'react'
import {OutlineToggleButton} from './outline-toggle-button'
import {getTogglerPropsExceptOnClick} from './use-toggle'

const Radio = ({
  isActive,
  title,
  rootClassName,
  onClick,
  ...inputProps
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'readOnly' | 'onChange' | 'checked'
> & {
  isActive: boolean
  title: string
  rootClassName?: string
  onClick: () => void
}) => (
  <div className={clsx(rootClassName, 'inline-flex')}>
    <label htmlFor={inputProps.id} className="sr-only">
      {title}
    </label>
    <input type="radio" hidden {...inputProps} checked={isActive} readOnly />
    <OutlineToggleButton
      {...getTogglerPropsExceptOnClick(
        {
          onClick,
        },
        isActive,
      )}
      isActive={isActive}
    >
      {title}
    </OutlineToggleButton>
  </div>
)

export default Radio
