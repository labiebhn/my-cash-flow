export const addUser = data => {
  return ({
    type: "ADD_USER",
    payload: data
  })
}

export const tabUser = data => {
  return ({
    type: "TAB_USER",
    payload: data
  })
}