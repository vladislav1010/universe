import * as React from 'react'
import {
  useControlledSwitchWarning,
  useOnChangeReadOnlyWarning,
} from '~/util/react/controlled'

function callAll<T extends unknown[]>(
  ...fns: (((...args: T) => void) | undefined)[]
) {
  return (...args: T) => fns.forEach(fn => fn?.(...args))
}

interface UseToggleProps {
  initialIsActive?: boolean
  onChange?: (isActive: boolean) => void
  isActive?: boolean
  readOnly?: boolean
}

// https://reactjs.org/blog/2020/08/10/react-v17-rc.html#other-breaking-changes
// Additionally, React 17 will always execute all effect cleanup functions (for all components) before it runs any new effects.
const useToggle = ({
  initialIsActive = false,
  onChange,
  isActive: controlledIsActive,
  readOnly = false,
}: UseToggleProps) => {
  const {current: initialState} = React.useRef(initialIsActive)
  const [state, setState] = React.useState<boolean>(initialState)

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
      'initialIsActive',
      'onChange',
    )
  }

  const isActiveIsControlled = controlledIsActive != null
  const isActive = isActiveIsControlled ? controlledIsActive : state

  async function dispatchWithOnChange(action: React.SetStateAction<boolean>) {
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

  function getTogglerProps({
    onClick,
    ...props
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.HTMLAttributes<any> = {}) {
    return {
      'aria-pressed': isActive,
      onClick: callAll(onClick, async () =>
        dispatchWithOnChange(_isActive => !_isActive),
      ),
      ...props,
    }
  }

  return {
    dispatchWithOnChange,
    getTogglerProps,
    isActive,
  }
}

const Checkbox = ({
  isActive: controlledIsActive,
  onChange,
  initialIsActive,
  readOnly,
  ...inputProps
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'readOnly' | 'onChange' | 'value'
> &
  UseToggleProps) => {
  const {getTogglerProps, isActive} = useToggle({
    isActive: controlledIsActive,
    onChange,
    initialIsActive,
    readOnly,
  })

  return (
    <div className="">
      <input type="checkbox" hidden {...inputProps} />
      {/* TODO */}
      <button {...getTogglerProps({})} aria-label="Переключить " />
    </div>
  )
}

export default Checkbox
