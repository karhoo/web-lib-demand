import { AuthService } from './AuthService'

describe('AuthService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const url = 'auth'

  describe('login', () => {
    const params = {
      username: 'username',
      password: 'password',
    }

    it('should call post of http', () => {
      new AuthService(http).login(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}/token`, params)
    })
  })

  describe('refreshToken', () => {
    const params = {
      refresh_token: 'token',
    }

    it('should call post of http', () => {
      new AuthService(http).refreshToken(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}/refresh`, params)
    })
  })
})
