import { assertNotUndefined, buildObjectByPath } from '@savchenko91/schema-validator'

import buildValidator from '../lib/build-validators'
import componentList from '../lib/component-list'
import { DrawerComponentProps } from '../types'
import get from 'lodash.get'
import React, { memo } from 'react'
import { Field } from 'react-final-form'

import { Comp } from '@/common/types'
import FieldError from '@/shared/field-error'

const FieldComponent = memo(function FieldComponent(props: DrawerComponentProps) {
  const CSchema = props.schemas[props.comp.compSchemaId]

  if (CSchema?.componentName === null || CSchema === undefined) {
    return null
  }

  const сomponentItem = componentList[CSchema.componentName]

  assertNotUndefined(сomponentItem)

  const Component = сomponentItem.component

  const validate = buildValidator(props.comp.validators)

  function injectProvidedDataToProps(providers: Comp['injections'], comp: Comp): Comp {
    if (!providers) {
      return comp
    }

    return providers?.reduce<Comp>((accComp, provider) => {
      if (!provider.fromGlobalPath || !provider.toCompPath) {
        return comp
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = get({ context: props.bindingContext }, provider.fromGlobalPath as any)

      const newProps = (buildObjectByPath({ ...accComp }, provider.toCompPath, data) as unknown) as Comp
      return newProps
    }, comp)
  }

  const injectedComp = injectProvidedDataToProps(props.comp.injections, props.comp)

  return (
    <Field
      validate={(v) => {
        const error = validate?.(v)
        return { ...error }
      }}
      type={сomponentItem.type}
      name={injectedComp.name}
      defaultValue={injectedComp.defaultValue}
    >
      {({ input, meta }) => {
        return (
          <div data-comp-id={props.comp.id} className="FieldErrorPositionRelative">
            <Component {...injectedComp.props} {...input} />
            <FieldError meta={meta} />
          </div>
        )
      }}
    </Field>
  )
})

export default FieldComponent
