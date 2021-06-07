export const host = 'http://192.168.43.70:5000/v1';

export const config = token => ({
  headers: {
    'Authorization': 'Bearer ' + token
  }
})