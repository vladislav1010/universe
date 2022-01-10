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

// TODO: Exclude<unknown, undefined> doesn't work
export function useInput<T extends Exclude<unknown, undefined>>({
  initialInput,
  onChange,
  input: controlledInput,
  readOnly = false,
}: UseInputProps<T>) {
  const {current: initialState} = React.useRef(initialInput)
  const [state, setState] = React.useState<T>(initialState)

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControlledSwitchWarning(controlledInput, 'input', 'useInput')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnChangeReadOnlyWarning(
      controlledInput,
      'input',
      'useInput',
      Boolean(onChange),
      readOnly,
      'readOnly',
      'initialInput',
      'onChange',
    )
  }

  const inputIsControlled = controlledInput !== undefined
  const input = inputIsControlled ? controlledInput : state

  function dispatchWithOnChange(action: React.SetStateAction<T>) {
    if (!inputIsControlled) {
      // https://github.com/kentcdodds/react-hooks/blob/main/src/exercise/06.md#3--store-the-state-in-an-object
      // the function probably is called asynchronously by client code
      setState(action)
    }

    if (action instanceof Function) {
      onChange?.(action(input))
    } else {
      onChange?.(action)
    }
  }

  return {
    dispatchWithOnChange,
    input,
  }
}

interface UseInputProps<T extends Exclude<unknown, undefined>> {
  initialInput: T
  onChange?: (input: T) => void
  input?: T
  readOnly?: boolean
}

const getTogglerPropsExceptOnClick = (
  props: // TODO: proper types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any = {},
  isActive: boolean,
) => ({
  'aria-pressed': isActive,
  ...props,
})

// https://reactjs.org/blog/2020/08/10/react-v17-rc.html#other-breaking-changes
// Additionally, React 17 will always execute all effect cleanup functions (for all components) before it runs any new effects.
function useToggle({
  initialInput,
  onChange,
  input: controlledInput,
  readOnly = false,
}: UseInputProps<boolean>) {
  const useInputReturn = useInput<boolean>({
    initialInput,
    onChange,
    input: controlledInput,
    readOnly,
  })

  function getTogglerProps({
    onClick,
    ...props
  }: // TODO: proper types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any = {}) {
    return {
      onClick: callAll(onClick, async () =>
        useInputReturn.dispatchWithOnChange(_isActive => !_isActive),
      ),
      ...getTogglerPropsExceptOnClick(props, useInputReturn.input),
    }
  }

  return {
    ...useInputReturn,
    getTogglerProps,
  }
}

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
  'type' | 'readOnly' | 'onChange' | 'value' | 'checked'
> &
  UseInputProps<boolean> & {
    title: string
    rootClassName?: string
  }) => {
  const {getTogglerProps, input: isActive} = useToggle({
    input: controlledInput,
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

export {Checkbox, Radio}
