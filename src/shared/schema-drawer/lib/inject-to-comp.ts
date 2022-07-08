import { Comp, Context } from '../model/types'
import get from 'lodash.get'

import buildObject from '@/lib/build-object'

export default function injectToComp(comp: Comp, context: Context): Comp {
  if (!comp?.injections) {
    return comp
  }

  return comp?.injections?.reduce<Comp>((accComp, injection) => {
    if (!injection.from || !injection.to) {
      return comp
    }

    const data = get({ context }, injection.from)

    const newProps = (buildObject({ ...accComp }, injection.to, { ...data }) as unknown) as Comp

    return newProps
  }, comp)
}
