import { PrimaryButton, Stack } from '@fluentui/react'

import arrayMutators from 'final-form-arrays'
import React, { FC } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import FieldError from '@/components/field-error'
import { SchemaConstructor } from '@/components/schema-constructor'
import CustomTextField from '@/components/text-field'
import { selectedHierarchyCompSchemaState, selectedNormCompSchemaState } from '@/recoil/comp-schema'
import { formSchemaState, selectedCompState } from '@/recoil/form-schema'
import { replaceObjectInArray } from '@/utils/replace-object-in-array'

const CompPanel: FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [formSchema, setFormSchema] = useRecoilState(formSchemaState)
  const selectedHierarchyCompSchema = useRecoilValue(selectedHierarchyCompSchemaState)
  const selectedNormCompSchema = useRecoilValue(selectedNormCompSchemaState)
  const selectedComp = useRecoilValue(selectedCompState)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(newSchemaItemProps: any) {
    const newSchema = replaceObjectInArray('id', formSchema.schema, newSchemaItemProps)
    setFormSchema({ ...formSchema, schema: newSchema })
  }

  return (
    <div className="CompPanel">
      {selectedNormCompSchema && (
        <Form
          key={JSON.stringify(selectedComp)}
          initialValues={selectedComp}
          mutators={{
            // potentially other mutators could be merged here
            ...arrayMutators,
          }}
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <Stack tokens={{ padding: '20px 20px 0' }}>
                  <Stack as="h2">{selectedComp?.name}</Stack>
                </Stack>
                <Stack tokens={{ padding: '20px 20px' }}>
                  <Field<string> name="name">
                    {({ input, meta }) => [
                      <CustomTextField key="1" label={t(`fieldNames.name`)} {...input} />,
                      <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                    ]}
                  </Field>
                  <SchemaConstructor
                    normComps={selectedNormCompSchema?.schema}
                    hierarchyComps={selectedHierarchyCompSchema?.schema}
                  />
                </Stack>
                <hr />
                <Stack tokens={{ padding: '20px 20px' }}>
                  {/* <BindingsSection componentSchema={selectedCompSchema} /> */}
                </Stack>
                <Stack tokens={{ padding: '20px 20px' }}>
                  <PrimaryButton type="submit">{t('buttons.save')}</PrimaryButton>
                </Stack>
              </form>
            )
          }}
        />
      )}
    </div>
  )
}

// function BindingsSection(props: { componentSchema: ComponentSchema }) {
//   const { t } = useTranslation()
//   const [formSchema] = useRecoilState(formSchemaState)

//   console.log('formSchema', formSchema)

//   const eventOptions =
//     props?.componentSchema?.events?.map((opt) => ({
//       key: opt,
//       text: opt,
//     })) || []

//   const actionsOptions =
//     props?.componentSchema?.actions?.map((opt) => ({
//       key: opt,
//       text: opt,
//     })) || []

//   const componentsIdsOptions =
//     Object.values(formSchema.schema)?.map((schema) => ({
//       key: schema.id,
//       text: schema.name,
//     })) || []

//   return (
//     <FieldArray name="bindings">
//       {({ fields }) => (
//         <div>
//           <PrimaryButton onClick={() => fields.push({ events: [], actions: [], componentIds: [] })}>
//             {t('formConstructorPage.addBindings')}
//           </PrimaryButton>
//           {fields.map((name, index) => (
//             <div key={name}>
//               <Field name={`${name}.events`}>
//                 {({ input }) => [
//                   <DropdownMultipleSelect
//                     selectedKeys={input.value}
//                     key="1"
//                     placeholder="events"
//                     options={eventOptions}
//                     {...input}
//                   />,
//                 ]}
//               </Field>
//               <Field name={`${name}.actions`}>
//                 {({ input }) => [
//                   <DropdownMultipleSelect
//                     selectedKeys={input.value}
//                     key="1"
//                     placeholder="actions"
//                     options={actionsOptions}
//                     {...input}
//                   />,
//                 ]}
//               </Field>
//               <Field name={`${name}.componentIds`}>
//                 {({ input }) => [
//                   <DropdownMultipleSelect
//                     selectedKeys={input.value}
//                     key="1"
//                     placeholder="components"
//                     options={componentsIdsOptions}
//                     {...input}
//                   />,
//                 ]}
//               </Field>
//               <PrimaryButton
//                 onClick={() => {
//                   fields.remove(index)
//                 }}
//               >
//                 {t('buttons.remove')}
//               </PrimaryButton>
//             </div>
//           ))}
//         </div>
//       )}
//     </FieldArray>
//   )
// }

export default CompPanel
