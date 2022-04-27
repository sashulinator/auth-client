import { Checkbox, PrimaryButton, Stack } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

// import { runAction } from '../../helpers/constructor-actions'
import React, { memo } from 'react'
import { Field } from 'react-final-form'

import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import { ROOT_COMP_ID } from '@/constants/common'
import { Norm } from '@/types/entities'
import { Comp } from '@/types/form-constructor'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReactComponents: Record<string, any> = {
  Stack,
  Checkbox,
  TextField: CustomTextField,
  PrimaryButton,
}

export interface CompDrawerProps {
  comps: Norm<Comp>
}

export interface DrawerComponentProps extends CompDrawerProps {
  comp: Comp
}

export function CompDrawer(props: CompDrawerProps): JSX.Element {
  const rootComp = props.comps[ROOT_COMP_ID]

  assertNotUndefined(rootComp)

  return <CompComponentFactory comps={props.comps} compId={rootComp.id} />
}

//

export interface CompComponentFactory {
  compId: string
  comps: Norm<Comp>
}

export const CompComponentFactory = (props: CompComponentFactory): JSX.Element => {
  const comp = props.comps[props.compId]

  assertNotUndefined(comp)

  if (/checkbox/.test(comp.componentName) && comp.type !== 'checkbox') {
    throw new Error('Вы создали компонент со словом "checkbox" в componentName, но type не "checkbox"')
  }

  if (comp.type === 'input' || comp.type === 'checkbox') {
    return <FieldComponent comp={comp} comps={props.comps} />
  }

  return <ContentComponent comp={comp} comps={props.comps} />
}

//

export const _ContentComponent = (props: DrawerComponentProps) => {
  const Component = ReactComponents[props.comp.componentName]

  if (props.comp.childCompIds === undefined) {
    return <Component {...props.comp.props}>{props.comp?.props?.children}</Component>
  }

  return (
    <Component {...props.comp.props}>
      {props.comp.childCompIds.map((compId) => {
        return <CompComponentFactory key={compId} comps={props.comps} compId={compId} />
      })}
    </Component>
  )
}
const ContentComponent = memo(_ContentComponent)

//

const _FieldComponent = (props: DrawerComponentProps) => {
  const Component = ReactComponents[props.comp.componentName]
  // const form = useForm()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(runAction('onInit', { form, schemaItem: comp, schemaItems: bindingNormComps }), [])

  return (
    <Field
      type={props.comp.type}
      name={props.comp.path}
      key={props.comp.path}
      defaultValue={props.comp.defaultValue}
      {...props.comp.props}
    >
      {({ input, meta }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function onChange(event: any) {
          // runAction('onChange', { form, schemaItem: comp, schemaItems: bindingNormComps })()
          input?.onChange(event)
        }

        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // function onBlur(...args: any[]) {
        //   runAction('onBlur', { form, schemaItem: comp, schemaItems: bindingNormComps })()
        //   input?.onBlur(...args)
        // }

        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // function onFocus(...args: any[]) {
        //   runAction('onFocus', { form, schemaItem: comp, schemaItems: bindingNormComps })()
        //   input?.onFocus(...args)
        // }

        return (
          <>
            <Component
              {...props.comp.props}
              {...input}
              onChange={onChange}
              // onBlur={onBlur} onFocus={onFocus}
            />
            <FieldError error={meta.touched && (meta.error || meta.submitError)} />
          </>
        )
      }}
    </Field>
  )
}
const FieldComponent = memo(_FieldComponent)
