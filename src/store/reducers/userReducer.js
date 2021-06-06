const initialState = {
  data: null,
  super: ['Manager, Accountant, Finance']
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case 'ADD_USER':
      return {
        ...state,
        data: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducer;