export const tabReport = data => {
  return({
    type: "TAB_REPORT",
    payload: data
  })
}

export const journalListReport = data => {
  return({
    type: "JOURNAL_LIST_REPORT",
    payload: data
  })
}