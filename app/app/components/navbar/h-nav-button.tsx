import clsx from 'clsx'
import * as React from 'react'
import {Link as RemixLink} from 'remix'
import {LinkButton} from '../button'
import {NavItemWithSubs} from './types'
import {useIsSelected} from './is-selected'

function getClassName({
  className,
  isSelected,
}: {
  className?: string
  isSelected: boolean
}) {
  return clsx(
    'underlined block hover:text-team-current focus:text-team-current whitespace-nowrap text-lg font-medium focus:outline-none',
    {
      'text-team-current active': isSelected,
      'text-secondary': !isSelected,
    },
    className,
  )
}

function Link({
  to,
  ...rest
}: Omit<Parameters<typeof RemixLink>['0'], 'to'> & {to: string}) {
  const isSelected = useIsSelected(to)

  return (
    <RemixLink
      prefetch="intent"
      className={getClassName({isSelected})}
      to={to}
      {...rest}
    />
  )
}

function Button({
  toPrefix,
  ...buttonProps
}: Pick<NavItemWithSubs, 'toPrefix'> &
  Omit<JSX.IntrinsicElements['button'], 'className'>) {
  const isSelected = useIsSelected(toPrefix)

  return <LinkButton className={getClassName({isSelected})} {...buttonProps} />
}

export {Button as HNavButton, Link as HNavLink}
