export interface HelloWorld {
  message: string
}

export function helloWorld(message: string): HelloWorld {
  return { message }
}
