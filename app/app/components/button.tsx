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
  isRounded?: boolean
  innerClassName?: string
}

function ButtonInner({
  children,
  isRounded,
  className,
}: Pick<ButtonProps, 'children'> & {
  isRounded: boolean
  className: ButtonProps['innerClassName']
}) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 opacity-100 disabled:opacity-50 transform transition transition-ease-in',
          'group-hover:bg-[rgba(77,136,255,.08)]',
          {
            'rounded-full': isRounded,
          },
        )}
      />

      <div
        className={clsx(
          'relative flex items-center w-full h-full whitespace-nowrap',
          'text-primary',
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<JSX.IntrinsicElements['button'], 'children'>
>(function Button(
  {children, className, innerClassName, isRounded = true, ...buttonProps},
  ref,
) {
  return (
    <button {...buttonProps} className={getClassName({className})} ref={ref}>
      <ButtonInner className={innerClassName} isRounded={isRounded}>
        {children}
      </ButtonInner>
    </button>
  )
})

const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink(
  {children, className, innerClassName, isRounded = true, ...rest},
  ref,
) {
  return (
    <AnchorOrLink ref={ref} className={getClassName({className})} {...rest}>
      <ButtonInner className={innerClassName} isRounded={isRounded}>
        {children}
      </ButtonInner>
    </AnchorOrLink>
  )
})

export {LinkButton, ButtonLink, Button}
