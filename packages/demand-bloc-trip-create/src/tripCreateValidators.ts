import dayjs from 'dayjs'
import dayTimezone from 'dayjs/plugin/timezone'
import utcPlugin from 'dayjs/plugin/utc'

dayjs.extend(utcPlugin)
dayjs.extend(dayTimezone)

export const isDateTimeInFuture = (date?: Date | string, time?: string, timezone?: string) => {
  if (!(time && date)) {
    return false
  }

  dayjs.tz.setDefault(timezone)

  const joinedDateTimeString = [dayjs(date).format('YYYY-MM-DD'), time].join('T')

  const bookingDate = dayjs(joinedDateTimeString, 'YYYY-MM-DDTHH:mm').tz(timezone)
  if (!bookingDate.isValid()) {
    return false
  }

  return bookingDate.isAfter(dayjs().add(29, 'minute'))
}
