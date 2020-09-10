import * as React from 'react'
import apiActions from './reducers/api/actions'
import tripActions from './reducers/trip/actions'

export default (dispatch: React.Dispatch<any>) => ({
  api: apiActions(dispatch),
  trip: tripActions(dispatch)
})
