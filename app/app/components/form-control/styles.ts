import {StylesProviderContext} from './form-control'

const styles: StylesProviderContext = {
  form: {
    container: 'w-full relative',
    helperText: 'mt-2 text-secondary leading-normal text-sm',
  },
  requiredIndicator: 'ml-1 text-red-500',
  label:
    'text-base mr-3 mb-2 font-medium transition-opacity duration-200 opacity-100 disabled:opacity-40 text-gray-400',
  formError: {
    icon: 'mr-[0.5em] text-red-500',
    text: 'text-red-500 mt-2 text-sm',
  },
}

export {styles}
