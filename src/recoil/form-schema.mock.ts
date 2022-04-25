export const formSchemaMock = {
  id: 'ee4254ef-a9a3-4243-be68-51ce733b338e',
  name: 'credentials',
  title: 'Креды',
  description: 'some description',
  schema: [
    {
      id: 'ee4254ef-7878-4243-be68-51ce733b338e',
      name: 'Блок1',
      componentSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
      componentName: 'Stack',
      path: 'hello',
      type: 'component',
      props: {
        as: 'ul',
        horizontal: true,
        verticalAlign: 'center',
        tokens: {
          childrenGap: 10,
          padding: '45px 40px',
        },
      },
      children: [
        'ee4254ef-9009-4243-be68-51ce733b338e',
        'ee4254ef-5555-4243-be68-51ce733b338e',
        'ee4234ef-9099-8943-8968-54ce7subject',
        'ee4234ef-9099-8943-8968-54ce73object',
      ],
    },
    {
      path: 'hello12',
      id: 'ee4254ef-9009-4243-be68-51ce733b338e',
      name: 'КнопкаГлавная1',
      componentSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
      componentName: 'PrimaryButton',
      type: 'button',
      props: {
        disabled: false,
        type: 'submit',
        children: 'hello',
      },
    },
    {
      id: 'ee4254ef-5555-4243-be68-51ce733b338e',
      name: 'КнопкаГлавная2',
      componentSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
      componentName: 'PrimaryButton',
      path: 'world',
      type: 'button',
      props: {
        disabled: false,
        children: 'koko',
      },
    },
    {
      id: 'ee4234ef-9099-8943-8968-54ce7subject',
      name: 'ТекстовоеПоле1',
      componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
      componentName: 'TextField',
      path: 'funny',
      defaultValue: 'init',
      type: 'input',
      bindings: [
        {
          events: ['onInit'],
          actions: ['setValue'],
          componentIds: ['ee4234ef-9099-8943-8968-54ce73object'],
        },
      ],
    },
    {
      id: 'ee4234ef-9099-8943-8968-54ce73object',
      name: 'ТекстовоеПоле2',
      componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
      componentName: 'TextField',
      path: 'kuku',
      type: 'input',
    },
  ],
}
