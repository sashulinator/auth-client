import { assertNotUndefined } from '@savchenko91/schema-validator'

import { assertionList } from '../constants/assertion-list'
import bindAssertions from '../lib/bind-assertions'
import bindEvents from '../lib/bind-events'
import { onBlur, onChange, onDestroy, onFocus } from '../lib/events'
import injectToComp from '../lib/inject-to-comp'
import isRequired from '../lib/is-required'
import { Observer } from '../lib/observer'
import { registerFieldChangeEvent } from '../lib/register-field-change-event'
import {
  Catalog,
  Comp,
  CompMeta,
  CompSchema,
  ComponentCompSchema,
  ComponentContext,
  FieldComponentContext,
} from '../model/types'
import React, { memo, useEffect, useMemo } from 'react'
import { Field } from 'react-final-form'

import FieldError from '@/shared/field-error'

export interface FieldComponentProps {
  comp: Comp
  schema: ComponentCompSchema
  schemas: Catalog<CompSchema>
  context: ComponentContext
  componentList: Record<string, CompMeta>
}

const FieldComponent = memo(function FieldComponent(props: FieldComponentProps) {
  const сomponentItem = props.componentList[props.schema.componentName]
  assertNotUndefined(сomponentItem)

  const validate = bindAssertions(assertionList, props.comp.assertionBindingSchema?.catalog)

  // TODO move to ComponentFactory
  const injectedComp = injectToComp(props.comp.injections, props.context, props.comp)

  assertNotUndefined(injectedComp.name)

  return (
    <Field
      destroyOnUnregister
      validate={(v) => validate?.(v)}
      type={сomponentItem.type}
      name={injectedComp.name}
      defaultValue={injectedComp.defaultValue}
    >
      {({ input, meta }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const context = useMemo<FieldComponentContext>(
          () => ({
            ...props.context,
            comp: injectedComp,
            observer: new Observer(),
          }),
          [props.comp.eventBindingSchema?.catalog]
        )

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          context.observer.addEvent(onBlur.name, input.onBlur)
          context.observer.addEvent(onFocus.name, input.onFocus)
          context.observer.addEvent(onChange.name, input.onChange)

          registerFieldChangeEvent(context)

          bindEvents(context)

          return context.observer.emitEvent(onDestroy.name)
        }, [props.comp.eventBindingSchema?.catalog])

        return (
          <div data-comp-id={injectedComp.id} className="FieldErrorPositionRelative">
            <сomponentItem.component
              {...input}
              {...injectedComp.props}
              context={props.context}
              required={isRequired(props.comp.assertionBindingSchema?.catalog)}
              onBlur={context.observer.emitEvent('onBlur')}
              onFocus={context.observer.emitEvent('onFocus')}
              onClick={context.observer.emitEvent('onClick')}
              onChange={context.observer.emitEvent('onChange')}
              validationError={meta.error}
            />
            <FieldError meta={meta} eventToShowError={injectedComp?.assertionBindingSchema?.eventToShowError} />
          </div>
        )
      }}
    </Field>
  )
})

export default FieldComponent
