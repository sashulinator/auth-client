import objectToPath from './object-to-path'

describe(objectToPath.name, () => {
  it(objectToPath.name, () => {
    const res = objectToPath({ test: { hello: [{ world: 'go' }] } })
    expect(res).toEqual('test.hello[0].world')
  })
})
