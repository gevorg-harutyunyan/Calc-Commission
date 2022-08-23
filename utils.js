export const getPercent = (number, percent) => number * (percent / 100)

const isNewWeek = (value1, value2) => {
  const date1 = new Date(value1)
  const date2 = new Date(value2)

  const first = date1.getDate() - date1.getDay()
  const nextWeekFirstDay = new Date(date1.setDate(first + 8))

  return !(date2 < nextWeekFirstDay)
}

export const userWeekLimitCalculate = (limit) => {
  let lasttracsactionDate = "1950-01-01"
  let thisWeekTransaktionAmount = 0
  return (date, amount) => {
    if (isNewWeek(lasttracsactionDate, date)) thisWeekTransaktionAmount = 0
    lasttracsactionDate = date
    if (thisWeekTransaktionAmount >= limit) return amount
    thisWeekTransaktionAmount += amount
    return thisWeekTransaktionAmount < limit
      ? 0
      : thisWeekTransaktionAmount - limit
  }
}

export const hundredthsFormat = (number) => {
  let str = number.toString()
  const dotIndex = str.indexOf(".")
  if (dotIndex === -1) return str + ".00"
  if (dotIndex === str.length - 2) return str + "0"
  return str
}