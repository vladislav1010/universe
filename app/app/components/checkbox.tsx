import clsx from 'clsx'
import * as React from 'react'
import {
  useControlledSwitchWarning,
  useOnChangeReadOnlyWarning,
} from '~/util/react/controlled'
import {OutlineToggleButton} from './outline-toggle-button'

function callAll<T extends unknown[]>(
  ...fns: (((...args: T) => void) | undefined)[]
) {
  return (...args: T) => fns.forEach(fn => fn?.(...args))
}

function useInput<T extends Exclude<unknown, undefined>>({
  initialInput,
  onChange,
  isActive: controlledIsActive,
  readOnly = false,
}: UseInputProps<T>) {
  const {current: initialState} = React.useRef(initialInput)
  const [state, setState] = React.useState<T>(initialState)

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControlledSwitchWarning(controlledIsActive, 'isActive', 'useCheckbox')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnChangeReadOnlyWarning(
      controlledIsActive,
      'isActive',
      'useCheckbox',
      Boolean(onChange),
      readOnly,
      'readOnly',
      'initialInput',
      'onChange',
    )
  }

  const isActiveIsControlled = controlledIsActive !== undefined
  const isActive = isActiveIsControlled ? controlledIsActive : state

  async function dispatchWithOnChange(action: React.SetStateAction<T>) {
    if (!isActiveIsControlled) {
      // https://github.com/kentcdodds/react-hooks/blob/main/src/exercise/06.md#3--store-the-state-in-an-object
      // the function probably is called asynchronously by client code
      setState(action)
    }

    if (action instanceof Function) {
      onChange?.(action(isActive))
    } else {
      onChange?.(action)
    }
  }

  return {
    dispatchWithOnChange,
    isActive,
  }
}

interface UseInputProps<T extends Exclude<unknown, undefined>> {
  initialInput: T
  onChange?: (isActive: T) => void
  isActive?: T
  readOnly?: boolean
}

// https://reactjs.org/blog/2020/08/10/react-v17-rc.html#other-breaking-changes
// Additionally, React 17 will always execute all effect cleanup functions (for all components) before it runs any new effects.
function useToggle({
  initialInput,
  onChange,
  isActive: controlledIsActive,
  readOnly = false,
}: UseInputProps<boolean>) {
  const useInputReturn = useInput<boolean>({
    initialInput,
    onChange,
    isActive: controlledIsActive,
    readOnly,
  })

  function getTogglerProps({
    onClick,
    ...props
  }: // TODO: proper types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any = {}) {
    return {
      'aria-pressed': useInputReturn.isActive,
      onClick: callAll(onClick, async () =>
        useInputReturn.dispatchWithOnChange(_isActive => !_isActive),
      ),
      ...props,
    }
  }

  return {
    ...useInputReturn,
    getTogglerProps,
  }
}

const Checkbox = ({
  isActive: controlledIsActive,
  onChange,
  initialInput,
  readOnly,
  title,
  rootClassName,
  ...inputProps
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'readOnly' | 'onChange' | 'value'
> &
  UseInputProps<boolean> & {
    title: string
    rootClassName?: string
  }) => {
  const {getTogglerProps, isActive} = useToggle({
    isActive: controlledIsActive,
    onChange,
    initialInput,
    readOnly,
  })

  return (
    <div className={clsx(rootClassName, 'inline-flex')}>
      <label htmlFor={inputProps.id} className="sr-only">
        {title}
      </label>
      <input
        type="checkbox"
        hidden
        {...inputProps}
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
