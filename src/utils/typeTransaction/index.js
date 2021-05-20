export const GenerateTypeTransaction = type => {
  switch(type) {
    case 'in':
      return 'Kas Masuk'
    case 'out':
      return 'Kas Keluar'
    case 'payable':
      return 'Utang'
    case 'receivable':
      return 'Piutang'
    default:
      return '';
  }
}