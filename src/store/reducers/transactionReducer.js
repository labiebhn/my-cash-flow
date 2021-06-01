const initialState = {
  data: null,
  sum: null,
  selectData: null,
  period: null,
  periodList: null,
  tab: 0,
  clusterList: [], //return array
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
    case 'PERIOD_LIST_TRANSACTION':
      return {
        ...state,
        periodList: payload
      }
    case 'TAB_TRANSACTION':
      return {
        ...state,
        tab: payload
      }
    case 'CLUSTER_LIST_TRANSACTION':
      return {
        ...state,
        clusterList: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default transactionReducer;