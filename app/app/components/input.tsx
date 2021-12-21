import clsx from 'clsx';
import * as React from 'react';

export type InputProps = React.ComponentPropsWithRef<'input'>

// TODO: Is :invalid needed?
function Input({className, ...rest}: InputProps) {
  // mobile iOS bug field text. 
  // https://egghead.io/lessons/scss-create-reset-styles-to-normalize-form-fields-cross-browser
  // The reason we maintain an outline is that for users on Windows, 
  // who may be using Windows high-contrast mode, where the colors 
  // that normally are visible outside of high-contrast mode don't apply, 
  // the outline ensures that there maintains a visible focus on interaction with the field.
  // https://egghead.io/lessons/scss-use-sass-mixins-to-style-inputs-with-accessible-contrast-and-keyboard-access
  return (
    <input className={clsx(className, 'text-base-iOSZoomIntoFieldFix h-10 px-4 py-0 font-sans rounded-none font-medium w-full min-w-0 outline-none appearance-none transition duration-200 border-none border-b border-secondary bg-transparent read-only:shadow-[none !important] select-all focus:border-team-current focus:shadow-[0px 1px 0px 0px] focus:shadow-team-current text-primary hover:border-team-current hover:shadow-[0 1px 0 0] hover:shadow-team-current focus:outline-transparent focus:outline-2')} {...rest} />
  )
}

export {Input}