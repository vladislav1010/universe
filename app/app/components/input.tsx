import clsx from 'clsx';
import * as React from 'react';

export type InputProps = React.ComponentPropsWithRef<'input'>

function Input({className, ...rest}: InputProps) {
  // TODO: mobile iOS bug field text. https://egghead.io/lessons/scss-create-reset-styles-to-normalize-form-fields-cross-browser
  return (
    <input className={clsx(className, 'text-md px-4 h-10 rounded-md w-full min-w-0 outline-none appearance-none transition duration-200')} {...rest} />
  )
}

export {Input}