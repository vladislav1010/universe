import * as React from 'react'
import {Link} from 'remix'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'
import {LogoIcon} from '../icons/logo'
import {Dialog, Popover} from '@headlessui/react'
import {useDisclosure} from '@chakra-ui/hooks'
import {TinyColor} from '@ctrl/tinycolor'
import {cssVar, setCssVar} from '../../util/css'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import {HNavButton, HNavLink} from './h-nav-button'
import {NavItem, NavItemLink, NavItemWithSubs} from './types'
import {BackMenuButton, VNavButton, VNavLink} from './v-button'

const navbarHeightCssVarName = '--navbarHeight'

function setNavbarHeightCssVar(el: HTMLElement | null) {
  if (!el) {
    return
  }

  const height = el.clientHeight

  setCssVar(navbarHeightCssVarName, `${height}px`)
}

const desktopMenuClassName = 'py-6'

const panelLevel2ClassName = 'bg-[#f2f4f7]'

const transformForChangingContainingBlockClassName = 'transform scale-100'

function NavSubItemButtonAndPopover({
  item,
}: {
  item: NavItemWithSubs<NavItemLink>
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Popover as="div" className="relative inline-block text-left">
      {({open, close}) => (
        <>
          <Popover.Button as={React.Fragment}>
            <VNavButton {...item} />
          </Popover.Button>
          <AnimatePresence>
            {open ? (
              <Popover.Panel static as={React.Fragment}>
                <motion.div
                  initial={{opacity: 0}}
                  className={clsx(
                    'left-0 fixed inset-y-0 w-[85%] focus:outline-none z-[-1]',
                    {
                      '-translate-x-full': open,
                    },
                    desktopMenuClassName,
                    panelLevel2ClassName,
                  )}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.15,
                    ease: 'easeInOut',
                  }}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                >
                  <ul>
                    {item.children.map(x => (
                      <li key={x.to}>
                        <VNavLink {...x} />
                      </li>
                    ))}
                  </ul>

                  <div className="absolute top-[1rem] left-[-1rem] transform -translate-x-full flex">
                    <CloseButton onClose={() => close()} />
                  </div>
                </motion.div>
              </Popover.Panel>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Popover>
  )
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
        'border-secondary hover:border-primary focus:border-primary inline-flex items-center justify-center h-7 w-7 border-2 rounded-full focus:outline-none overflow-hidden transition',
        className,
      )}
      onClick={onClose}
    >
      <svg viewBox="0 0 24 24" className="w-3 h-3" focusable="false">
        <path
          fill="currentColor"
          d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
        />
      </svg>
      <span className="sr-only">{t('navbar.drawer.close')}</span>
    </button>
  )
}

const MotionDialogOverlay = motion(Dialog.Overlay)

function NavButtonAndDrawer({
  toPrefix,
  name,
  children,
}: Pick<NavItemWithSubs, 'toPrefix' | 'name' | 'children'>) {
  const {isOpen, onClose, onToggle} = useDisclosure()
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <HNavButton onClick={onToggle} toPrefix={toPrefix}>
        {name}
      </HNavButton>
      <Dialog
        as="div"
        static
        className={clsx("fixed inset-0 overflow-hidden", {'hidden': !isOpen})}
        open={isOpen}
        onClose={onClose}
      >
        <AnimatePresence>
          {isOpen ? (
            <div className="absolute inset-0 overflow-hidden">
              <MotionDialogOverlay
                initial={{opacity: 0}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.15,
                  ease: 'easeInOut',
                }}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="absolute inset-0 transition-opacity backdrop-blur-md"
                style={{
                  backgroundColor: `#${new TinyColor(cssVar('--text-primary'))
                    .setAlpha(0.02)
                    .toHex8()}`,
                }}
              />
              <div
                className="fixed inset-y-0 right-0 w-[40%] flex"
                style={{
                  marginTop: `var(${navbarHeightCssVarName})`,
                }}
              >
                <motion.div
                  initial={{opacity: 0}}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.15,
                    ease: 'easeInOut',
                  }}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  className={clsx(
                    'w-full',
                    transformForChangingContainingBlockClassName,
                  )}
                >
                  <div className="absolute top-[1rem] left-[-1rem] transform -translate-x-full flex z-[-11]">
                    <CloseButton onClose={onClose} />
                  </div>
                  <div
                    className={clsx(
                      'h-full flex flex-col bg-primary shadow-xl',
                      desktopMenuClassName,
                    )}
                  >
                    <div className="relative flex-1">
                      <ul>
                        {children.map(x => (
                          <li
                            className="flex flex-col flex-nowrap"
                            key={x.to ?? x.toPrefix}
                          >
                            {x.to == null ? (
                              <NavSubItemButtonAndPopover
                                item={x as NavItemWithSubs<NavItemLink>}
                              />
                            ) : (
                              <VNavLink {...x} />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : null}
        </AnimatePresence>
      </Dialog>
    </>
  )
}

// TODO: indicate somehow that root nav items haven't description
function MobileNavButtonAndPopover({
  toPrefix,
  name,
  children,
  level,
}: Pick<NavItemWithSubs, 'toPrefix' | 'name' | 'children'> & {
  level: number
}) {
  return (
    <Popover>
      {({open, close}) => (
        <>
          <Popover.Button as={React.Fragment}>
            <VNavButton toPrefix={toPrefix} name={name} />
          </Popover.Button>
          <MobileSubMenuList
            items={children}
            open={open}
            level={level}
            parentName={name}
            close={close}
          />
        </>
      )}
    </Popover>
  )
}

function MobileSubMenuList({
  items,
  open,
  level,
  parentName,
  close,
}: {
  items: NavItem[]
  open: boolean
  level: number
  close: () => void
  parentName: string
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <AnimatePresence>
      {open ? (
        <Popover.Panel as={React.Fragment} static>
          <motion.div
            initial={{opacity: 0, x: -200}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -200}}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.15,
              ease: 'linear',
            }}
            className={clsx('fixed inset-0 flex flex-col overflow-y-scroll', {
              'bg-primary': level < 2,
              [panelLevel2ClassName]: level >= 2,
            })}
            style={{
              marginTop: `var(${navbarHeightCssVarName})`,
            }}
          >
            <BackMenuButton name={parentName} close={close} />
            <ul className="mt-4">
              {items.map(x => (
                <li
                  className="flex flex-col flex-nowrap"
                  key={x.to ?? x.toPrefix}
                >
                  {x.to == null ? (
                    <MobileNavButtonAndPopover {...x} level={level + 1} />
                  ) : (
                    // Divergent change code smell. Extract function refactoring motivation.
                    <VNavLink {...x} />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </Popover.Panel>
      ) : null}
    </AnimatePresence>
  )
}

const topVariants = {
  open: {rotate: 45, y: 7},
  closed: {rotate: 0, y: 0},
}

const centerVariants = {
  open: {opacity: 0},
  closed: {opacity: 1},
}

const bottomVariants = {
  open: {rotate: -45, y: -5},
  closed: {rotate: 0, y: 0},
}

function MobilePopover({items}: {items: NavItem[]}) {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion ? {duration: 0} : {}

  return (
    <Popover>
      {({open}) => {
        const state = open ? 'open' : 'closed'

        return (
          <>
            <Popover.Button as={React.Fragment}>
              <button className="inline-flex items-center justify-center p-1 transition border-2 rounded-full focus:border-primary hover:border-primary border-secondary text-primary w-14 h-14 focus:outline-none">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    animate={state}
                    variants={topVariants}
                    transition={transition}
                    x="6"
                    y="9"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                  <motion.rect
                    animate={state}
                    variants={centerVariants}
                    transition={transition}
                    x="6"
                    y="15"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                  <motion.rect
                    animate={state}
                    variants={bottomVariants}
                    transition={transition}
                    x="6"
                    y="21"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </Popover.Button>
            <MobileMenuList items={items} open={open} />
          </>
        )
      }}
    </Popover>
  )
}

function MobileMenuList({items, open}: {items: NavItem[]; open: boolean}) {
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    if (open) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = '100vh'
      document.body.style.width = '100vw'
    } else {
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-scroll')
      document.body.style.removeProperty('height')
      document.body.style.removeProperty('width')
    }
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <Popover.Panel as={React.Fragment} static>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.15,
              ease: 'linear',
            }}
            className="fixed inset-0 flex flex-col overflow-y-scroll bg-primary"
            style={{
              marginTop: `var(${navbarHeightCssVarName})`,
            }}
          >
            <ul>
              {items.map(x => (
                <li
                  className="flex flex-col flex-nowrap"
                  key={x.to ?? x.toPrefix}
                >
                  {x.to == null ? (
                    <MobileNavButtonAndPopover {...x} level={1} />
                  ) : (
                    // Divergent change code smell. Extract function refactoring motivation.
                    <VNavLink {...x} />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </Popover.Panel>
      ) : null}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const {t} = useTranslation('common')
  const ITEMS: NavItem[] = [
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
    <div
      className="px-5vw py-9 lg:py-12 sticky z-[1] bg-primary"
      ref={navbarRef}
    >
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
        <div className="block lg:hidden">
          <MobilePopover items={ITEMS} />
        </div>
        <ul className="hidden lg:flex">
          {ITEMS.map(x => (
            <li className="px-5 py-2" key={x.to ?? x.toPrefix}>
              {x.to == null ? (
                <NavButtonAndDrawer toPrefix={x.toPrefix} name={x.name}>
                  {x.children}
                </NavButtonAndDrawer>
              ) : (
                <HNavLink to={x.to}>{x.name}</HNavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
