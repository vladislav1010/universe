import useInput, {UseInputProps} from './use-input'

function callAll<T extends unknown[]>(
  ...fns: (((...args: T) => void) | undefined)[]
) {
  return (...args: T) => fns.forEach(fn => fn?.(...args))
}

export const getTogglerPropsExceptOnClick = (
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

export default useToggle
