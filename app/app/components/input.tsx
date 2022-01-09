import clsx from 'clsx'
import * as React from 'react'

const inputAndTextareaClassName =
  'text-base-iOSZoomIntoFieldFix px-4 py-0 rounded-none font-medium w-full min-w-0 outline-none appearance-none transition duration-200 border-b border-secondary bg-transparent read-only:shadow-[none !important] select-all focus:border-team-current focus:shadow-[0px 1px 0px 0px] focus:shadow-team-current text-primary focus:outline-transparent focus:outline-2'

// TODO: Is :invalid needed?
function Input({className, ...rest}: React.ComponentPropsWithRef<'input'>) {
  // mobile iOS bug field text.
  // https://egghead.io/lessons/scss-create-reset-styles-to-normalize-form-fields-cross-browser
  // The reason we maintain an outline is that for users on Windows,
  // who may be using Windows high-contrast mode, where the colors
  // that normally are visible outside of high-contrast mode don't apply,
  // the outline ensures that there maintains a visible focus on interaction with the field.
  // https://egghead.io/lessons/scss-use-sass-mixins-to-style-inputs-with-accessible-contrast-and-keyboard-access
  return (
    <input
      className={clsx(className, inputAndTextareaClassName, 'h-10')}
      {...rest}
    />
  )
}

const textareaAndAutoGrowUtilStyle = {
  className:
    'px-4 py-0 border-b font-medium text-base-iOSZoomIntoFieldFix h-full overflow-x-hidden',
  style: {
    gridArea: '1/1',
  },
}

function Textarea({
  className,
  ...rest
}: Omit<React.ComponentPropsWithRef<'textarea'>, 'value' | 'onChange'> & {
  rootClassName?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}) {
  const valueFixEndingNewline = rest.value.replace(/(\r\n|\r|\n)$/, '$1 ')

  return (
    <div className="items-center inline-grid w-full">
      <span
        className={clsx(
          'whitespace-pre-wrap invisible',
          textareaAndAutoGrowUtilStyle.className,
        )}
        style={textareaAndAutoGrowUtilStyle.style}
      >
        {valueFixEndingNewline}
      </span>
      <textarea
        {...rest}
        rows={1}
        spellCheck={false}
        className={clsx(
          className,
          inputAndTextareaClassName,
          'resize-none',
          textareaAndAutoGrowUtilStyle.className,
        )}
        style={textareaAndAutoGrowUtilStyle.style}
      />
    </div>
  )
}

export {Input, Textarea}
