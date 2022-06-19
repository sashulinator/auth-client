import { Constructor } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorReturnType<T extends new (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMixins<DConstructor extends Constructor, MixinFunction extends (...args: any[]) => DConstructor>(
  derivedCtor: DConstructor,
  mixins: MixinFunction[]
): new (...args: ConstructorParameters<DConstructor>) => ReturnType<MixinFunction> &
  ConstructorReturnType<DConstructor> {
  const superMutant = mixins.reduce((mutant, mixin) => {
    return mixin(mutant)
  }, derivedCtor)

  return (superMutant as unknown) as new (...args: ConstructorParameters<DConstructor>) => ReturnType<MixinFunction> &
    ConstructorReturnType<DConstructor>
}
