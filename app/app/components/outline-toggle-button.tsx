import * as React from 'react'
import clsx from 'clsx'

interface OutlineToggleButtonProps
  extends Omit<JSX.IntrinsicElements['button'], 'children' | 'type'> {
  children: React.ReactNode | React.ReactNode[]
  isActive: boolean
}

const sizesClassName = {
  lg: 'lg:h-[65px] lg:text-lg lg:px-8 text-base h-[49px] px-[22px]',
}

function OutlineToggleButton({
  isActive,
  children,
  ...props
}: OutlineToggleButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        'rounded-full inline-flex items-center justify-center select-none transition-colors duration-300 bg-primary border-[rgba(0,0,0,.1)] border focus-within:border-[rgba(0,0,0,.25)] tracking-tight font-medium',
        sizesClassName.lg,
        {
          'bg-inverse': isActive,
        },
      )}
    >
      <span
        className={clsx('text-primary relative top-[-1px] block', {
          'text-inverse': isActive,
        })}
      >
        {children}
      </span>
    </button>
  )
}

export {OutlineToggleButton}
