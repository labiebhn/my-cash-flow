export const addTransaction = data => {
  return ({
    type: "ADD_TRANSACTION",
    payload: data
  })
}

export const selectTransaction = data => {
  return ({
    type: "SELECT_TRANSACTION",
    payload: data
  })
}

export const sumTransaction = data => {
  return ({
    type: "SUM_TRANSACTION",
    payload: data
  })
}

export const periodTransaction = data => {
  return ({
    type: "PERIOD_TRANSACTION",
    payload: data
  })
}

export const tabTransaction = data => {
  return ({
    type: "TAB_TRANSACTION",
    payload: data
  })
}