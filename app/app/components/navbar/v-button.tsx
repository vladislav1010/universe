import * as React from 'react'
import {NavItemContent, NavItemLink, NavItemWithSubs} from './types'
import {Button as ButtonBase, ButtonLink as ButtonLinkBase} from '../button'
import clsx from 'clsx'
import {useIsSelected} from './is-selected'
import {useTranslation} from 'react-i18next'

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

function NavLink({to, ...content}: NavItemLink) {
  const isSelected = useIsSelected(to)

  return (
    <ButtonLinkBase {...props({isSelected})} to={to}>
      <ButtonInner {...content} />
    </ButtonLinkBase>
  )
}

const NavButton = React.forwardRef<
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

function BackMenuButton({close, name}: {close: () => void; name: string}) {
  const {t} = useTranslation('common')

  return (
    <ButtonBase
      aria-label={t('navbar.backMenu')}
      {...props({isSelected: false})}
      name={name}
      onClick={() => close()}
    >
      <svg
        className="mr-2"
        width="18"
        height="12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 6.75a.75.75 0 000-1.5v1.5zM.47 5.47a.75.75 0 000 1.06l4.773 4.773a.75.75 0 101.06-1.06L2.061 6l4.242-4.243a.75.75 0 00-1.06-1.06L.47 5.47zM17 5.25H1v1.5h16v-1.5z"
          fill="#040E20"
          fillOpacity="0.69"
        />
      </svg>
      <ButtonInner name={name} />
    </ButtonBase>
  )
}

export {NavButton as VNavButton, NavLink as VNavLink, BackMenuButton}
