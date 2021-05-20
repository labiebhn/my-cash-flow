export const FindAccountCode = (code, account) => {
  let result = null;
  account.map(account => {
    if(account.code === code) {
      result = account.name;
    }
  });

  return result;
}