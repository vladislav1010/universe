export interface NavItemContent {
  name: string
  description?: string
}

export interface NavItemLink extends NavItemContent {
  to: string
  children?: never
  toPrefix?: never
  description?: string
}

export interface NavItemWithSubs<Item extends NavItem = NavItem>
  extends NavItemContent {
  children: Item[]
  toPrefix: string
  to?: never
}

export type NavItem = NavItemLink | NavItemWithSubs
