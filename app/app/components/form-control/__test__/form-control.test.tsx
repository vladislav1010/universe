/* eslint-disable jest/prefer-called-with */
/* eslint-disable react/display-name */
import { fireEvent, render, screen, testA11y } from "../../../../tests/utils"
import * as React from "react"
import {
  FormControl,
  FormControlOptions,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  RequiredIndicator,
  useFormControl,
} from "../"
import { StylesProvider } from "../form-control"

type OmittedTypes = "disabled" | "required" | "readOnly"
type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, OmittedTypes> &
  FormControlOptions

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const inputProps = useFormControl<HTMLInputElement>(props)
    return <input ref={ref} {...inputProps} />
  },
)

it("passes a11y test in default state", async () => {
  await testA11y(
    <StylesProvider value={{}}>
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>
    </StylesProvider>,
  )
})

it("passes a11y test in when required", async () => {
  await testA11y(
    <StylesProvider value={{}}>
    <FormControl id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>
    </StylesProvider>,
  )
})

it("passes a11y test in when invalid", async () => {
  await testA11y(<StylesProvider value={{}}>
    <FormControl id="name" isInvalid>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl></StylesProvider>,
  )
})

test("only displays error icon and message when invalid", () => {
  const { rerender } = render(<StylesProvider value={{}}>
    <FormControl id="name" isInvalid>
      <FormLabel>Name</FormLabel>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorIcon data-testid="icon" />
      <FormErrorMessage data-testid="message">
        Your name is invalid
      </FormErrorMessage>
    </FormControl></StylesProvider>,
  )

  expect(screen.getByTestId("icon")).toBeVisible()
  expect(screen.getByTestId("message")).toBeVisible()

  rerender(<StylesProvider value={{}}>
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorIcon data-testid="icon" />
      <FormErrorMessage data-testid="message">
        Your name is invalid
      </FormErrorMessage>
    </FormControl></StylesProvider>,
  )

  expect(screen.queryByTestId("icon")).not.toBeInTheDocument()
  expect(screen.queryByTestId("message")).not.toBeInTheDocument()
})

test("only displays required indicator when required", () => {
  const { rerender } = render(<StylesProvider value={{}}>
    <FormControl id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl></StylesProvider>,
  )

  const indicator = screen.getByRole("presentation", { hidden: true })

  expect(indicator).toBeVisible()
  expect(indicator).toHaveTextContent("*")

  rerender(<StylesProvider value={{}}>
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl></StylesProvider>,
  )

  expect(screen.queryByRole("presentation")).not.toBeInTheDocument()
})

test("useFormControl calls provided input callbacks", () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()

  render(<StylesProvider value={{}}>
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input
        data-testid="input"
        placeholder="Name"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </FormControl></StylesProvider>,
  )
  const input = screen.getByTestId("input")

  fireEvent.focus(input)
  fireEvent.blur(input)
  expect(onFocus).toHaveBeenCalled()
  expect(onBlur).toHaveBeenCalled()
})

test("has the proper aria attributes", async () => {
  const { rerender } = render(<StylesProvider value={{}}>
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
    </FormControl></StylesProvider>,
  )
  let input = screen.getByLabelText(/Name/)

  expect(input).toHaveAttribute("aria-describedby", "name-helptext")
  expect(input).not.toHaveAttribute("aria-invalid")
  expect(input).not.toBeRequired()
  expect(input).not.toHaveAttribute("aria-readonly")

  rerender(<StylesProvider value={{}}>
    <FormControl id="name" isRequired isInvalid isReadOnly>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage data-testid="error">
        Your name is invalid
      </FormErrorMessage>
    </FormControl></StylesProvider>,
  )
  input = screen.getByLabelText(/Name/)
  const indicator = screen.getByRole("presentation", { hidden: true })
  const errorMessage = screen.getByTestId("error")

  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toBeRequired()
  expect(input).toHaveAttribute("aria-readonly", "true")
  expect(input).toHaveAttribute(
    "aria-describedby",
    "name-feedback name-helptext",
  )
  expect(indicator).toHaveAttribute("aria-hidden")
  expect(errorMessage).toHaveAttribute("aria-live", "polite")
})

test("has the correct role attributes", () => {
  render(<StylesProvider value={{}}>
    <FormControl data-testid="control" id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
    </FormControl></StylesProvider>,
  )
  const control = screen.getByTestId("control")

  expect(screen.getByRole("presentation", { hidden: true })).toBeInTheDocument()
  expect(screen.getByRole("group")).toEqual(control)
})

test("has the correct data attributes", async () => {
  render(<StylesProvider value={{}}>
    <FormControl
      data-testid="control"
      id="name"
      isRequired
      isInvalid
      isDisabled
      isReadOnly
    >
      <FormLabel data-testid="label">Name</FormLabel>
      <RequiredIndicator data-testid="indicator" />
      <Input placeholder="Name" />
      <FormHelperText data-testid="helper-text">
        Please enter your name!
      </FormHelperText>
      <FormErrorMessage data-testid="error-message">
        Your name is invalid.
      </FormErrorMessage>
    </FormControl></StylesProvider>,
  )

  fireEvent.focus(screen.getByLabelText(/Name/))

  const label = screen.getByTestId("label")
  expect(label).toHaveAttribute("data-focus")
  expect(label).toHaveAttribute("data-invalid")
  expect(label).toHaveAttribute("data-readonly")
})

test("can provide a custom aria-describedby reference", () => {
  const { rerender } = render(<Input aria-describedby="reference" />)
  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "reference",
  )

  rerender(<StylesProvider value={{}}>
    <FormControl id="name">
      <Input aria-describedby="name-expanded-helptext" />
      <FormHelperText>Please enter your name!</FormHelperText>
      <p id="name-expanded-helptext">
        Sometimes it can be really helpfull to enter a name, trust me.
      </p>
    </FormControl></StylesProvider>,
  )

  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "name-expanded-helptext name-helptext",
  )
})