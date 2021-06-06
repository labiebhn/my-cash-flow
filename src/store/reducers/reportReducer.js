const initialState = {
  tab: 0,
  report: null,
}

const reportReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case 'TAB_REPORT':
      return {
        ...state,
        tab: payload
      }
    case 'LIST_REPORT':
      return {
        ...state,
        report: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reportReducer;