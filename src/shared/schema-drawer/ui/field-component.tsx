import { assertNotUndefined } from '@savchenko91/schema-validator'

import { isCheckbox } from '..'
import { assertionList } from '../constants/assertion-list'
import bindAssertions from '../lib/bind-assertions'
import bindEvents from '../lib/bind-events'
import { onBlur, onChange, onDestroy, onFocus } from '../lib/events'
import isRequired from '../lib/is-required'
import { registerFieldChangeEvent } from '../lib/register-field-change-event'
import { Comp, CompMeta, CompSchema, ComponentCompSchema, ComponentContext, Dictionary } from '../model/types'
import React, { memo, useEffect } from 'react'
import { Field } from 'react-final-form'

import { useOnUnmount } from '@/lib/use-on-unmount'
import FieldError from '@/shared/field-error'

export interface FieldComponentProps {
  comp: Comp
  schema: ComponentCompSchema
  schemas: Dictionary<CompSchema>
  context: ComponentContext
  componentList: Record<string, CompMeta>
}

const FieldComponent = memo(function FieldComponent(props: FieldComponentProps) {
  assertNotUndefined(props.comp.name)

  const сomponentItem = props.componentList[props.schema.componentName]
  assertNotUndefined(сomponentItem)

  const validate = bindAssertions(assertionList, props.comp.assertionBindingSchema?.data)

  return (
    <Field
      destroyOnUnregister
      validate={(v) => validate?.(v)}
      type={сomponentItem.type}
      name={props.comp.name}
      defaultValue={isCheckbox(сomponentItem) ? props.comp.defaultValue ?? false : props.comp.defaultValue}
    >
      {({ input, meta }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          props.context.observer.addEvent(onBlur.name, input.onBlur)
          props.context.observer.addEvent(onFocus.name, input.onFocus)
          props.context.observer.addEvent(onChange.name, input.onChange)

          registerFieldChangeEvent(props.context)

          bindEvents(props.context)

          return props.context.observer.emitEvent(onDestroy.name)
        }, [props.comp.eventBindingSchema?.data])

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useOnUnmount(() => props.comp.undefinedOnDestroy && input.onChange(undefined))

        const readOnly =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          !!(props.context?.formState as any)?.values?.instanceId &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (props.context as any)?.fetchedData?.availableActions?.dataBlock?.screenReadOnly

        return (
          <div className="FieldErrorPositionRelative" data-comp-id={props.comp.id}>
            <сomponentItem.component
              {...input}
              {...props.comp.props}
              context={props.context}
              disabled={props.comp.props?.disabled || readOnly}
              required={isRequired(props.comp.assertionBindingSchema?.data)}
              onBlur={props.context.observer.emitEvent('onBlur')}
              onFocus={props.context.observer.emitEvent('onFocus')}
              onClick={props.context.observer.emitEvent('onClick')}
              onChange={props.context.observer.emitEvent('onChange')}
              validationError={meta.error}
            />
            <FieldError meta={meta} eventToShowError={props.comp?.assertionBindingSchema?.eventToShowError} />
          </div>
        )
      }}
    </Field>
  )
})

export default FieldComponent
