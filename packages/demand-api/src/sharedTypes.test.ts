import { MeetingPointTypes, PlaceDetailTypes, PoiTypes } from './sharedTypes'

describe('sharedTypes', () => {
  it('should export correct MeetingPointTypes', () => {
    expect(MeetingPointTypes.DEFAULT).toBe('DEFAULT')
    expect(MeetingPointTypes.PICK_UP).toBe('PICK_UP')
    expect(MeetingPointTypes.DROP_OFF).toBe('DROP_OFF')
    expect(MeetingPointTypes.MEET_AND_GREET).toBe('MEET_AND_GREET')
    expect(MeetingPointTypes.CURB_SIDE).toBe('CURB_SIDE')
    expect(MeetingPointTypes.STAND_BY).toBe('STAND_BY')
  })

  it('should export correct PlaceDetailTypes', () => {
    expect(PlaceDetailTypes.AIRPORT).toBe('AIRPORT')
    expect(PlaceDetailTypes.TRAIN_STATION).toBe('TRAIN_STATION')
    expect(PlaceDetailTypes.METRO_STATION).toBe('METRO_STATION')
    expect(PlaceDetailTypes.PORT).toBe('PORT')
    expect(PlaceDetailTypes.HOTEL).toBe('HOTEL')
    expect(PlaceDetailTypes.OTHER).toBe('OTHER')
  })

  it('should export correct PoiTypes', () => {
    expect(PoiTypes.ENRICHED).toBe('ENRICHED')
    expect(PoiTypes.REGULATED).toBe('REGULATED')
    expect(PoiTypes.NEAREST).toBe('NEAREST')
  })
})
