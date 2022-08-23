import fs from "fs"
import {
  getCashInConfig,
  getCashOutJuridicalConfig,
  getCashOutNaturalConfig,
} from "./api.js"
import {
  getPercent,
  hundredthsFormat,
  userWeekLimitCalculate,
} from "./utils.js"

const transactions = JSON.parse(fs.readFileSync(process.argv[2]))

const cashInConfig = await getCashInConfig()
const cashOutNatConfig = await getCashOutNaturalConfig()
const cashOutJurConfig = await getCashOutJuridicalConfig()

const usersWeekLimitFunctions = {}

transactions.forEach((transaction) => {
  const amount = transaction.operation.amount
  if (transaction.type === "cash_in") {
    const max = cashInConfig.max.amount
    const commission = getPercent(amount, cashInConfig.percents)
    const res = commission > max ? max : commission
    console.log(hundredthsFormat(res))
  } else if (transaction.user_type === "natural") {
    const userId = transaction.user_id
    if (!usersWeekLimitFunctions[userId]) {
      usersWeekLimitFunctions[userId] = userWeekLimitCalculate(
        cashOutNatConfig.week_limit.amount
      )
    }
    const calcAmount = usersWeekLimitFunctions[userId]

    const commission = getPercent(
      calcAmount(transaction.date, amount),
      cashOutNatConfig.percents
    )
    console.log(hundredthsFormat(commission))
  } else if (transaction.user_type === "juridical") {
    const min = cashOutJurConfig.min.amount
    const commission = getPercent(amount, cashOutJurConfig.percents)
    const res = commission < min ? min : commission
    console.log(hundredthsFormat(res))
  }
})
