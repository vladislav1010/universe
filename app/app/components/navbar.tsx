import * as React from 'react'
import {Link, useLocation} from 'remix'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {LogoIcon} from './icons/logo'
import {Button, ButtonLink, LinkButton} from './button'
import {Dialog, Popover, Transition} from '@headlessui/react'
import {useDisclosure} from '@chakra-ui/hooks'
import {TinyColor} from '@ctrl/tinycolor'
import {cssVar, setCssVar} from '../util/css'

interface NavItemContent {
  name: string
  description?: string
}

interface NavItemLink extends NavItemContent {
  to: string
  children?: never
  toPrefix?: never
  description?: string
}

interface NavItemWithSubItems<Item extends NavItem = NavItem>
  extends NavItemContent {
  children: Item[]
  toPrefix: string
  to?: never
}

type NavItem = NavItemLink | NavItemWithSubItems

const navSubItemButtonOrLinkProps = {
  innerClassName: 'py-3 px-12 md:px-8 sm:px-6',
  className: 'w-full',
  isRounded: false,
}

const navbarHeightCssVarName = '--navbarHeight'

function navLinkOrButtonClassName({
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

function NavLink({
  to,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {to: string}) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  return (
    <Link
      prefetch="intent"
      className={navLinkOrButtonClassName({isSelected})}
      to={to}
      {...rest}
    />
  )
}

function NavButton({
  toPrefix,
  ...buttonProps
}: Pick<NavItemWithSubItems, 'toPrefix'> &
  Omit<JSX.IntrinsicElements['button'], 'className'>) {
  const location = useLocation()
  const isSelected =
    toPrefix === location.pathname ||
    location.pathname.startsWith(`${toPrefix}/`)

  return (
    <LinkButton
      className={navLinkOrButtonClassName({isSelected})}
      {...buttonProps}
    />
  )
}

function NavSubItemButtonAndMenu({
  navItem,
}: {
  navItem: NavItemWithSubItems<NavItemLink>
}) {
  return (
    <Popover as="div" className="relative inline-block text-left">
      {({open, close}) => (
        <>
          <Popover.Button as={React.Fragment}>
            <Button {...navSubItemButtonOrLinkProps}>
              <NavSubItemButtonOrLinkContent {...navItem} />
            </Button>
          </Popover.Button>
          <Popover.Panel
            className={clsx(
              'left-0 fixed inset-y-0 w-[20rem] bg-[#f2f4f7] focus:outline-none z-[-1] transform scale-100',
              {
                '-translate-x-full': open,
              },
            )}
          >
            <ul>
              {navItem.children.map(x => (
                <li key={x.to}>
                  <ButtonLink {...navSubItemButtonOrLinkProps} to={x.to}>
                    <NavSubItemButtonOrLinkContent {...x} />
                  </ButtonLink>
                </li>
              ))}
            </ul>

            <div className="absolute top-[1rem] left-[-1rem] transform -translate-x-full flex">
              <CloseButton onClose={() => close()} />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}

function NavSubItemButtonOrLinkContent({name, description}: NavItemContent) {
  if (description == null) {
    return <span>name</span>
  } else {
    return (
      <div className="flex flex-col flex-nowrap">
        <div>{name}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
    )
  }
}

function CloseButton({
  className,
  onClose,
}: {
  onClose: React.MouseEventHandler
  className?: string
}) {
  const {t} = useTranslation('common')

  return (
    <button
      className={clsx(
        'border-secondary hover:border-primary focus:border-primary inline-flex items-center justify-center p-2 h-7 w-7 border-2 rounded-full focus:outline-none overflow-hidden transition',
        className,
      )}
      onClick={onClose}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
      >
        <path
          fill="currentColor"
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        />
      </svg>
      <span className="sr-only">{t('navbar.drawer.close')}</span>
    </button>
  )
}

function NavButtonAndSubItemsDrawer({
  toPrefix,
  name,
  children: subItems,
}: Pick<NavItemWithSubItems, 'toPrefix' | 'name' | 'children'>) {
  const {isOpen, onClose, onToggle} = useDisclosure()

  return (
    <>
      <NavButton onClick={onToggle} toPrefix={toPrefix}>
        {name}
      </NavButton>
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={isOpen}
          onClose={onClose}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className="absolute inset-0 transition-opacity backdrop-blur-md"
                style={{
                  backgroundColor: `#${new TinyColor(cssVar('--color-black'))
                    .setAlpha(0.02)
                    .toHex8()}`,
                }}
              />
            </Transition.Child>
            <div
              className="fixed inset-y-0 right-0 max-w-full flex"
              style={{
                marginTop: `var(${navbarHeightCssVarName})`,
              }}
            >
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-[30rem] transform scale-100">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-[1rem] left-[-1rem] transform -translate-x-full flex z-[-11]">
                      <CloseButton onClose={onClose} />
                    </div>
                  </Transition.Child>
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl">
                    <div className="relative flex-1">
                      <nav>
                        <ul className="py-8 sm:py-6">
                          {subItems.map(x => (
                            <li
                              className="flex flex-col flex-nowrap"
                              key={x.to ?? x.toPrefix}
                            >
                              {x.to == null ? (
                                <NavSubItemButtonAndMenu
                                  navItem={
                                    x as NavItemWithSubItems<NavItemLink>
                                  }
                                />
                              ) : (
                                <ButtonLink
                                  {...navSubItemButtonOrLinkProps}
                                  to={x.to}
                                >
                                  <NavSubItemButtonOrLinkContent {...x} />
                                </ButtonLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

function setNavbarHeightCssVar(el: HTMLElement | null) {
  if (!el) {
    return
  }

  const height = el.clientHeight

  setCssVar(navbarHeightCssVarName, `${height}px`)
}

export default function Navbar() {
  const {t} = useTranslation('common')
  const LINKS: NavItem[] = [
    {name: t('navbar.links.services.name'), to: '/services'},
    {
      name: t('navbar.links.test.name'),
      toPrefix: '/test',
      children: [
        {
          name: t('navbar.links.test.children.test1.name'),
          description: t('navbar.links.test.children.test1.description'),
          to: '/test/test1',
        },
        {
          name: t('navbar.links.test.children.test2.name'),
          toPrefix: '/test/test2',
          children: [
            {
              name: t('navbar.links.test.children.test2.children.test3.name'),
              to: '/test/test2/test3',
            },
          ],
        },
      ],
    },
  ]

  const navbarRef = React.useRef<HTMLDivElement>(null)

  const _setNavbarHeightCssVar = React.useCallback(() => {
    setNavbarHeightCssVar(navbarRef.current)
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', _setNavbarHeightCssVar)

    _setNavbarHeightCssVar()

    return () => {
      window.removeEventListener('resize', _setNavbarHeightCssVar)
    }
  }, [_setNavbarHeightCssVar])

  return (
    <div className="px-5vw py-9 lg:py-12 sticky z-[1] bg-white" ref={navbarRef}>
      <nav className="flex items-center justify-between mx-auto text-primary max-w-8xl">
        <div>
          <Link
            prefetch="intent"
            to="/"
            className="block text-2xl font-medium transition text-primary underlined whitespace-nowrap focus:outline-none"
          >
            <LogoIcon />
          </Link>
        </div>

        <ul className="hidden lg:flex">
          {LINKS.map(link => (
            <li className="px-5 py-2" key={link.to ?? link.toPrefix}>
              {link.to == null ? (
                <NavButtonAndSubItemsDrawer
                  toPrefix={link.toPrefix}
                  name={link.name}
                >
                  {link.children}
                </NavButtonAndSubItemsDrawer>
              ) : (
                <NavLink to={link.to}>{link.name}</NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
