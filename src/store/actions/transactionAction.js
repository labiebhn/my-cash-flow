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

export const sumBalanceTransaction = data => {
  return ({
    type: "SUM_BALANCE_TRANSACTION",
    payload: data
  })
}

export const periodTransaction = data => {
  return ({
    type: "PERIOD_TRANSACTION",
    payload: data
  })
}

export const periodListTransaction = data => {
  return ({
    type: "PERIOD_LIST_TRANSACTION",
    payload: data
  })
}

export const tabTransaction = data => {
  return ({
    type: "TAB_TRANSACTION",
    payload: data
  })
}

export const clusterListTransaction = data => {
  return ({
    type: "CLUSTER_LIST_TRANSACTION",
    payload: data
  })
}