import dayjs from 'dayjs'
import { isDateTimeInFuture } from './tripCreateValidators'

describe('tripCreateValidators', () => {
  describe('isDateTimeInFuture', () => {
    it('should return false when date is not defined', () => {
      expect(isDateTimeInFuture()).toEqual(false)
    })

    it('should return false when date is not defined', () => {
      expect(isDateTimeInFuture('2020-11-10T03:30:00')).toEqual(false)
    })

    it('should return false when date is not valid', () => {
      expect(isDateTimeInFuture('7676-778-10T03:30:00', '12:00')).toEqual(false)
    })

    it('should return false if date is in less than 29 minutes', () => {
      expect(isDateTimeInFuture(dayjs().format(), dayjs().format('H:mm'))).toEqual(false)
    })

    it('should return true if date is in more than 29 minutes', () => {
      expect(
        isDateTimeInFuture(
          dayjs()
            .add(1, 'd')
            .format(),
          dayjs().format('HH:mm')
        )
      ).toEqual(true)
    })

    it('should return if the time is in future for Europe/Paris timezone', () => {
      const date = dayjs().add(1, 'h')

      expect(isDateTimeInFuture(date.format(), date.format('HH:mm'), 'Europe/Paris')).toEqual(true)
    })
  })
})
