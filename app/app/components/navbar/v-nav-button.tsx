import * as React from 'react'
import {NavItemContent, NavItemLink, NavItemWithSubs} from './types'
import {Button as ButtonBase, ButtonLink as ButtonLinkBase} from '../button'
import clsx from 'clsx'
import {useIsSelected} from './is-selected'

const props = ({isSelected}: {isSelected: boolean}) => ({
  innerClassName: clsx('py-3 px-12 md:px-8 sm:px-6', {
    'text-team-current active': isSelected,
    'text-secondary': !isSelected,
  }),
  className: 'w-full',
  isRounded: false,
})

function ButtonInner({name, description}: NavItemContent) {
  if (description == null) {
    return <span>{name}</span>
  } else {
    return (
      <div className="flex flex-col flex-nowrap">
        <div>{name}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
    )
  }
}

function Link({to, ...content}: NavItemLink) {
  const isSelected = useIsSelected(to)

  return (
    <ButtonLinkBase {...props({isSelected})} to={to}>
      <ButtonInner {...content} />
    </ButtonLinkBase>
  )
}

const Button = React.forwardRef<
  HTMLButtonElement,
  Omit<NavItemWithSubs, 'children'> &
    Omit<JSX.IntrinsicElements['button'], 'children' | 'className'>
>(function Button({toPrefix, name, description, ...buttonProps}, ref) {
  const isSelected = useIsSelected(toPrefix)

  return (
    <ButtonBase {...props({isSelected})} {...buttonProps} ref={ref}>
      <ButtonInner name={name} description={description} />
    </ButtonBase>
  )
})

export {Button as VNavButton, Link as VNavLink}
