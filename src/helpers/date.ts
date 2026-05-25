import dayjs, { type ConfigType } from 'dayjs'

export const DATE_FORMATS = {
  date: 'DD/MM/YYYY',
  dateTime: 'DD/MM/YYYY HH:mm',
  time: 'HH:mm',
  yearMonthDate: 'YYYY-MM-DD',
  fullDateTime: 'DD/MM/YYYY HH:mm:ss',
} as const

export type DateFormat = keyof typeof DATE_FORMATS | string

export function formattedDate(date: ConfigType, format: DateFormat = 'date') {
  const parsedDate = dayjs(date)

  if (!parsedDate.isValid()) {
    return ''
  }

  return parsedDate.format(DATE_FORMATS[format as keyof typeof DATE_FORMATS] ?? format)
}
