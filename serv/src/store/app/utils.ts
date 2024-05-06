export function useTodayTime(times: number[]) {
  const date = new Date()
  if (date.getDay() === 0) return times[6]
  return times[date.getDay() - 1]
}
