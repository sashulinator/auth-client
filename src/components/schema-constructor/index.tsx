import { Checkbox, PrimaryButton, Stack } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import { runAction } from '../../helpers/constructor-actions'
import React, { FC, memo, useEffect } from 'react'
import { Field, useForm } from 'react-final-form'

import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import { HierarchyComp, NormComp, NormComps } from '@/types/form-constructor'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normComponents: Record<string, any> = {
  Stack,
  Checkbox,
  TextField: CustomTextField,
  PrimaryButton,
}

export interface SchemaConstructorProps {
  normComps: NormComps
  hierarchyComps?: HierarchyComp[]
}

export function SchemaConstructor({ normComps, hierarchyComps }: SchemaConstructorProps): JSX.Element {
  return (
    <>
      {hierarchyComps?.map((comp) => {
        if (comp === undefined) {
          return null
        }
        if (isString(comp)) {
          return comp
        }
        if (/checkbox/.test(comp.componentName) && comp.type !== 'checkbox') {
          throw new Error('Вы создали компонент со словом "checkbox" в componentName, но type не "checkbox"')
        }

        return <SchemaItemComponent key={comp.path} hierarchyComp={comp} normComps={normComps} />
      })}
    </>
  )
}

//

export const SchemaItemComponent: FC<{
  hierarchyComp: HierarchyComp
  normComps: NormComps
}> = (props) => {
  const normComp = props.normComps[props.hierarchyComp.id]

  const bindingNormComps = normComp?.bindings?.reduce<NormComp[]>((acc, binding) => {
    const foundSchemaItems = binding.componentIds.map((id) => props.normComps[id]) as NormComp[]
    return [...acc, ...foundSchemaItems]
  }, [])

  if (normComp === undefined) {
    return null
  }

  if (normComp.type === 'input' || normComp.type === 'checkbox') {
    return <FieldComponent normComp={normComp} bindingNormComps={bindingNormComps} />
  }

  return <ContentComponent normComps={props.normComps} hierarchyComp={props.hierarchyComp} />
}

//

export const _SimpleComponent = (props: { normComps: NormComps; hierarchyComp: HierarchyComp }) => {
  const { hierarchyComp } = props
  const Component = normComponents[hierarchyComp?.componentName]

  if (hierarchyComp?.props?.children === undefined) {
    return (
      <Component {...hierarchyComp.props}>
        <SchemaConstructor normComps={props.normComps} hierarchyComps={hierarchyComp.children} />
      </Component>
    )
  }

  return <Component {...hierarchyComp.props}>{hierarchyComp?.props?.children}</Component>
}
const ContentComponent = memo(_SimpleComponent)

const _FieldComponent: FC<{
  normComp: NormComp
  bindingNormComps?: NormComp[]
}> = (props) => {
  const { normComp, bindingNormComps } = props
  const Component = normComponents[normComp?.componentName]
  const form = useForm()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(runAction('onInit', { form, schemaItem: normComp, schemaItems: bindingNormComps }), [])

  return (
    <Field
      type={normComp.type}
      name={normComp.path}
      key={normComp.path}
      defaultValue={normComp.defaultValue}
      {...normComp.props}
    >
      {({ input, meta }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function onChange(event: any) {
          runAction('onChange', { form, schemaItem: normComp, schemaItems: bindingNormComps })()
          input?.onChange(event)
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function onBlur(...args: any[]) {
          runAction('onBlur', { form, schemaItem: normComp, schemaItems: bindingNormComps })()
          input?.onBlur(...args)
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function onFocus(...args: any[]) {
          runAction('onFocus', { form, schemaItem: normComp, schemaItems: bindingNormComps })()
          input?.onFocus(...args)
        }

        return (
          <>
            <Component {...normComp.props} {...input} onChange={onChange} onBlur={onBlur} onFocus={onFocus} />
            <FieldError error={meta.touched && (meta.error || meta.submitError)} />
          </>
        )
      }}
    </Field>
  )
}
const FieldComponent = memo(_FieldComponent)
