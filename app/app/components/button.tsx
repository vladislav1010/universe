import clsx from 'clsx'
import * as React from 'react'
import {AnchorOrLink} from './misc'

function getClassName({className}: {className?: string}) {
  return clsx(
    'group relative inline-flex text-lg font-medium focus:outline-none opacity-100 disabled:opacity-50 transition',
    className,
  )
}

function LinkButton({
  className,
  underlined,
  ...buttonProps
}: {underlined?: boolean} & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        underlined
          ? 'underlined whitespace-nowrap focus:outline-none'
          : 'underline',
        'text-primary inline-block',
      )}
    />
  )
}

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[]
}

function ButtonInner({children}: Pick<ButtonProps, 'children'>) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 rounded-full opacity-100 disabled:opacity-50 transform transition transition-ease-in',
          'group-hover:bg-[rgba(15,48,106,.05)]',
        )}
      />

      <div
        className={clsx(
          'relative flex items-center justify-center w-full h-full whitespace-nowrap',
          'px-11 py-6 space-x-5',
          'text-primary',
        )}
      >
        {children}
      </div>
    </>
  )
}

function Button({
  children,
  className,
  ...buttonProps
}: ButtonProps & Omit<JSX.IntrinsicElements['button'], 'children'>) {
  return (
    <button {...buttonProps} className={getClassName({className})}>
      <ButtonInner>{children}</ButtonInner>
    </button>
  )
}

const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink({children, className, ...rest}, ref) {
  return (
    <AnchorOrLink ref={ref} className={getClassName({className})} {...rest}>
      <ButtonInner>{children}</ButtonInner>
    </AnchorOrLink>
  )
})

export {LinkButton, ButtonLink, Button}
