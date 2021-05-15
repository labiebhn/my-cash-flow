export const addRoom = data => {
  return({
    type: "ADD_ROOM",
    payload: data
  })
}

export const selectRoom = data => {
  return({
    type: "SELECT_ROOM",
    payload: data
  })
}