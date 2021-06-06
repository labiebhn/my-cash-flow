export const tabReport = data => {
  return({
    type: "TAB_REPORT",
    payload: data
  })
}

export const listReport = data => {
  return({
    type: "LIST_REPORT",
    payload: data
  })
}