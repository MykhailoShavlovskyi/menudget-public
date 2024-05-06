export function getHour(time: number) {
  let hour: number | string = Math.floor(time)
  if (hour < 10) hour = `0${hour}`
  return hour.toString()
}

export function getMinute(time: number) {
  let minute: number | string = Math.round((time % 1) * 60)
  if (minute < 10) minute = `0${minute}`
  return minute.toString()
}

export function getTime(time: number) {
  return `${getHour(time)}:${getMinute(time)}`
}
