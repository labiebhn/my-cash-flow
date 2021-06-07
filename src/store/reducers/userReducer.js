const initialState = {
  data: null,
  super: ['Manager', 'Accountant', 'Finance'],
  tab: 0,
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case 'ADD_USER':
      return {
        ...state,
        data: payload
      }
    case 'TAB_USER':
      return {
        ...state,
        tab: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducer;