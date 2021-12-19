import {
  render as rtlRender,
  fireEvent,
} from "@testing-library/react"
import { toHaveNoViolations, axe } from "jest-axe"
import React from 'react'
import type { RunOptions } from "axe-core"
import type { RenderOptions } from '@testing-library/react'

export * from './press'

expect.extend(toHaveNoViolations)

type UI = Parameters<typeof rtlRender>[0]

export { axe }

export * from "@testing-library/react"

export { default as userEvent } from "@testing-library/user-event"

export type {
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks"
export { act as invoke, renderHook } from "@testing-library/react-hooks"

export const escape = (ui: HTMLElement) =>
  fireEvent.keyDown(ui, { key: "Escape", keyCode: 27 })

type TestA11YOptions = RenderOptions & { axeOptions?: RunOptions }

/**
 * Validates against common a11y mistakes.
 *
 * Wrapper for jest-axe
 *
 * @example
 * ```jsx
 * it('passes a11y test', async () => {
 *  await testA11Y(<MyComponent />, options);
 * });
 *
 * // sometimes we need to perform interactions first to render conditional UI
 * it('passes a11y test when open', async () => {
 *  const { container } = render(<MyComponent />, options);
 *
 *  fireEvent.click(screen.getByRole('button'));
 *
 *  await testA11Y(container, options);
 * });
 * ```
 *
 * @see https://github.com/nickcolley/jest-axe#testing-react-with-react-testing-library
 */
export const testA11y = async (
  ui: UI | Element,
  { axeOptions, ...options }: TestA11YOptions = {},
) => {
  const container = React.isValidElement(ui)
    ? rtlRender(ui, options).container
    : ui

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const results = await axe(container, axeOptions)

  expect(results).toHaveNoViolations()
}