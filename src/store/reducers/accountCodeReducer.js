const initialState = {
  data: null,
  in: [
    { id: 411, title: 'Jasa' },
    { id: 311, title: 'Modal' },
  ],
  out: [
    { id: 512, title: 'Air & Listrik' },
    { id: 113, title: 'Peralatan' },
    { id: 124, title: 'Gedung' },
    { id: 511, title: 'Gaji' },
    { id: 513, title: 'Pajak' },
    { id: 516, title: 'Beban Lain-lain' },
  ]
}

const accountCodeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case 'ADD_ACCOUNT_CODE':
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

export default accountCodeReducer;