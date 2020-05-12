import { Features } from './Features'

export class ObjectConfig {
  private constructor(config: object, env: string)

  fetch(): Promise<Features>
  getValue(key: string): boolean | null
}
