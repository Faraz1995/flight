import clsx, { ClassValue } from 'clsx'

export const cn = (...classnames: ClassValue[]) => {
  return clsx(classnames.filter(Boolean))
}

export const addThousandsSeparator = (value: string | number | null) => {
  if (!value && value !== 0) return 'نامشخص'
  if (value === 'null') {
    return 0
  }
  const chars = `${value}`.replace(/٬/g, '').split('').reverse()
  const result = []
  for (let i = 0; i < chars.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      result.push(',')
    }
    result.push(chars[i])
  }

  return result.reverse().join('')
}

export const humanizeDurationTime = (duration: string) => {
  const [hours, minutes] = duration.split(':').map(Number)

  return `${hours > 0 ? `${hours} ساعت` : ''}  
${minutes > 0 ? `و ${minutes} دقیقه` : ''}`
}

export const extractTime = (dateTime: string) => {
  const date = new Date(dateTime)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}

export const formatGeorigianDate = (input: string) => {
  const date = new Date(input)

  const day = date.getDate()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const month = monthNames[date.getMonth()]

  return `(${day} ${month})`
}

export const formatJalaaliDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const jalaali = new Date(date).toLocaleDateString('fa-IR', options)
  return jalaali
}
