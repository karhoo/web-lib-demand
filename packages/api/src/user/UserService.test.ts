import { UserService } from './UserService'

describe('UserService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
    patch: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const url = 'directory'

  describe('getCurrentUser', () => {
    it('should call get of http', () => {
      new UserService(http).getCurrentUser()

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`${url}/users/me`)
    })
  })

  describe('resetPassword', () => {
    const params = { email: 'email' }

    it('should call post of http', () => {
      new UserService(http).resetPassword(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}/users/password-reset`, params)
    })
  })

  describe('getOrganisationConfiguration', () => {
    const id = 'id'

    it('should call get of http', () => {
      new UserService(http).getOrganisationConfiguration(id)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`${url}/organisations/${id}`)
    })
  })
})
