/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

type NonNullProperties<Type> = {
  [Key in keyof Type]-?: Exclude<Type[Key], null | undefined>
}
type Await<Type> = Type extends Promise<infer Value> ? Await<Value> : Type
