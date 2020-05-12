import { Features } from './Features'

export class KarhooRemoteConfig {
  private constructor()

  fetch(): Promise<Features>
  getValue(key: string): boolean | null
}
