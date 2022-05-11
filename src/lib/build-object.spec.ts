import buildObject from './build-object'

describe('entity-actions', () => {
  it(buildObject.name, () => {
    const res = buildObject({ test: {} }, 'test.hello', 'world')
    expect(res).toEqual({ test: { hello: 'world' } })
  })

  it(buildObject.name, () => {
    const comp = {
      id: 'l31bxk3r',
      name: 'l31bxk3s',
      title: 'Injector',
      injections: [
        {
          to: 'props.value',
          from: 'context',
        },
      ],
      compSchemaId: '9ac3d680-6b53-4046-acc9-f492ba91be6b',
    }

    const res = buildObject(Object.freeze(comp), 'props.items', [{ item1: 'item1' }])

    expect(res).toEqual({
      id: 'l31bxk3r',
      name: 'l31bxk3s',
      title: 'Injector',
      injections: [{ to: 'props.value', from: 'context' }],
      compSchemaId: '9ac3d680-6b53-4046-acc9-f492ba91be6b',
      props: { items: [{ item1: 'item1' }] },
    })
  })
})
