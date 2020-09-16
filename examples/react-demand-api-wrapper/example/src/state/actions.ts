import * as React from 'react'
import tripActions from './reducers/trip/actions'

export default (dispatch: React.Dispatch<any>) => ({
  trip: tripActions(dispatch),
})
