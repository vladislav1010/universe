import * as React from 'react'
import {Link, useLocation} from 'remix'
import clsx from 'clsx'
import {json, LoaderFunction} from 'remix'
import {i18n} from '~/i18n.server'
import {useTranslation} from 'react-i18next'
import {LogoIcon} from './icons/logo'
import {LinkButton} from './button'
import {Dialog, Transition} from '@headlessui/react'
import {useDisclosure} from '@chakra-ui/hooks'
import {TinyColor} from '@ctrl/tinycolor'
import {cssVar} from '../util/css'

interface NavItemBase {
  name: string
}

interface NavItemLink extends NavItemBase {
  to: string
  children?: never
}

interface NavItemWithSubItems extends NavItemBase {
  children: NavItem[]
  toPrefix: string
  to?: never
}

type NavItem = NavItemLink | NavItemWithSubItems

function getClassNavLinkOrButtonClassName({
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
      className={getClassNavLinkOrButtonClassName({isSelected})}
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
      className={getClassNavLinkOrButtonClassName({isSelected})}
      {...buttonProps}
    />
  )
}

function NavButtonAndSubItemsDrawer({
  toPrefix,
  name,
  children: subItems,
}: Pick<NavItemWithSubItems, 'toPrefix' | 'name' | 'children'>) {
  const {isOpen, onClose, onToggle} = useDisclosure()
  const {t} = useTranslation('common')

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
                  backgroundColor:
                    '#' +
                    new TinyColor(cssVar('--color-black'))
                      .setAlpha(0.1)
                      .toHex8(),
                }}
              />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-screen max-w-md">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                      <button
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={onClose}
                      >
                        <span className="sr-only">
                          {t('navbar.drawer.close')}
                        </span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {subItems.map(x => (
                        <div>{x.name}</div>
                      ))}
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

export default function Navbar() {
  let {t} = useTranslation('common')
  const LINKS: NavItem[] = [
    {name: t('navbar.links.services'), to: '/services'},
    {
      name: t('navbar.links.test.name'),
      toPrefix: '/test',
      children: [
        {name: t('navbar.links.test.children.test1'), to: '/test/test1'},
        {
          name: t('navbar.links.test.children.test2.name'),
          toPrefix: '/test/test2',
          children: [
            {
              name: t('navbar.links.test.children.test2.children.test3'),
              to: '/test/test2/test3',
            },
          ],
        },
      ],
    },
  ]

  return (
    <div className="px-5vw py-9 lg:py-12">
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
              {link.to != null ? (
                <NavLink to={link.to}>{link.name}</NavLink>
              ) : (
                <>
                  <NavButtonAndSubItemsDrawer
                    toPrefix={link.toPrefix}
                    name={link.name}
                  >
                    {link.children}
                  </NavButtonAndSubItemsDrawer>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
