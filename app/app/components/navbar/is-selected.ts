import {useLocation} from 'remix'

// https://enterprisecraftsmanship.com/posts/encapsulation-revisited/
// "hiding information accidental to the clients' needs"
// "Although the AcquareCompany method maintains this invariant, the invariant itself can be easily broken."
// https://enterprisecraftsmanship.com/posts/dry-damp-unit-tests/
// solidbook
// signifiers
const useIsSelected = (toOrPrefix: string) => {
  const location = useLocation()
  return (
    toOrPrefix === location.pathname ||
    location.pathname.startsWith(`${toOrPrefix}/`)
  )
}

export {useIsSelected}
