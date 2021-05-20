const initialState = {
  data: null,
  sum: null,
  selectData: null,
  period: null,
  tab: 1
}

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case 'ADD_TRANSACTION':
      return {
        ...state,
        data: payload
      }
    case 'SELECT_TRANSACTION':
      return {
        ...state,
        selectData: payload
      }
    case 'SUM_TRANSACTION':
      return {
        ...state,
        sum: payload
      }
    case 'PERIOD_TRANSACTION':
      return {
        ...state,
        period: payload
      }
    case 'TAB_TRANSACTION':
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

export default transactionReducer;