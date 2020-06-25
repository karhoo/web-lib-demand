/* eslint @typescript-eslint/no-explicit-any: 0 */
import { HttpResponse } from '../http/types'
import { PlaceDetailTypes, MeetingPointTypes } from '../sharedTypes'

import { PoiSearchResponse } from './types'

export const getMockedPoiSearchResponse = (data: any): HttpResponse<PoiSearchResponse> => ({
  ok: true,
  status: 200,
  body: {
    pois: [
      {
        id: `k_poi_placeId:${data?.searchKey ?? ''}`,
        address: {
          display_address: `k_poi_display_address:${data?.searchKey ?? ''}`,
        },
        details: {
          type: PlaceDetailTypes.TRAIN_STATION,
        },
        geojson: 'geojson',
        name: 'name',
        meeting_points: [
          {
            position: {
              latitude: 90,
              longitude: 90,
            },
            type: MeetingPointTypes.DEFAULT,
          },
        ],
        position: {
          latitude: 90,
          longitude: 90,
        },
      },
    ],
  },
})

export const getMockedErrorPoiSearchResponse = (): HttpResponse<PoiSearchResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K001',
    message: `Poi: Something went wrong`,
  },
})

export const getPoiSearchMock = () =>
  jest.fn((data: any) => {
    return Promise.resolve(getMockedPoiSearchResponse(data))
  })
