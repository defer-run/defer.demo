import helloWorldFn from 'src/defer/helloWorld'

export const helloWorld = async () => {
  await helloWorldFn()
  return 'Hello World!'
}
