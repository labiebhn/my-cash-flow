const initialState = {
  data: null,
  selectData: null,
}

const roomReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case 'ADD_ROOM':
      return {
        ...state,
        data: payload
      }
    case 'SELECT_ROOM':
      return {
        ...state,
        selectData: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default roomReducer;