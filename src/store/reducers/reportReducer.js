const initialState = {
  tab: 0,
  journalList: null,
}

const reportReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case 'TAB_REPORT':
      return {
        ...state,
        tab: payload
      }
    case 'JOURNAL_LIST_REPORT':
      return {
        ...state,
        journalList: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reportReducer;