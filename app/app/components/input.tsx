import clsx from 'clsx'
import * as React from 'react'
import styled from 'styled-components'
import {FormControlOptions, useFormControl} from './form-control'

const inputAndTextareaClassName =
  'text-base-iOSZoomIntoFieldFix px-4 py-0 rounded-none font-medium w-full min-w-0 outline-none appearance-none transition duration-200 border-b border-secondary bg-transparent read-only:shadow-[none !important] select-all focus:border-team-current focus:shadow-[0px 1px 0px 0px] focus:shadow-team-current text-primary focus:outline-transparent focus:outline-2'

type Omitted = 'disabled' | 'required' | 'readOnly' | 'size'

// TODO: Is :invalid needed?
const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithRef<'input'>, Omitted> & FormControlOptions
>(function Input(ownProps, ref) {
  const input = useFormControl<HTMLInputElement>(ownProps)

  // mobile iOS bug field text.
  // https://egghead.io/lessons/scss-create-reset-styles-to-normalize-form-fields-cross-browser
  // The reason we maintain an outline is that for users on Windows,
  // who may be using Windows high-contrast mode, where the colors
  // that normally are visible outside of high-contrast mode don't apply,
  // the outline ensures that there maintains a visible focus on interaction with the field.
  // https://egghead.io/lessons/scss-use-sass-mixins-to-style-inputs-with-accessible-contrast-and-keyboard-access
  return (
    <input
      {...input}
      className={clsx(ownProps.className, inputAndTextareaClassName, 'h-10')}
      ref={ref}
    />
  )
})

const textareaAndAutoGrowUtilStyle = {
  className:
    'px-4 py-0 border-b font-medium text-base-iOSZoomIntoFieldFix h-full overflow-x-hidden',
  style: {
    gridArea: '1/1',
  },
}

const StyledTextarea = styled.textarea(textareaAndAutoGrowUtilStyle.style)

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  Omit<
    React.ComponentPropsWithRef<'textarea'>,
    'value' | 'onChange' | Omitted
  > & {
    rootClassName?: string
    value: string
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  } & FormControlOptions
>(function Textarea({rootClassName, ...ownProps}, ref) {
  const textarea = useFormControl<HTMLTextAreaElement>(ownProps)

  const valueFixEndingNewline = ownProps.value.replace(/(\r\n|\r|\n)$/, '$1 ')

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
      <StyledTextarea
        {...textarea}
        rows={1}
        spellCheck={false}
        className={clsx(
          ownProps.className,
          inputAndTextareaClassName,
          'resize-none',
          textareaAndAutoGrowUtilStyle.className,
        )}
        ref={ref}
      />
    </div>
  )
})

export {Input, Textarea}
