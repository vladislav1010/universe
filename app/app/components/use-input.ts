import React from 'react'
import {
  useControlledSwitchWarning,
  useOnChangeReadOnlyWarning,
} from '~/util/react/controlled'

export interface UseInputProps<T extends Exclude<unknown, undefined>> {
  initialInput: T
  onChange?: (input: T) => void
  input?: T
  readOnly?: boolean
}

// TODO: Exclude<unknown, undefined> doesn't work
function useInput<T extends Exclude<unknown, undefined>>({
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

export default useInput
