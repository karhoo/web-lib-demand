import { helloWorld } from '../src/helloWorld'

describe('web-lib-demand-hello-world', () => {
  it('should helloWorld return message', () => {
    expect(helloWorld('test')).toEqual({ message: 'test' })
  })
})
