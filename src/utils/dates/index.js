export const FormatDateID = initDate => {
  var formatDate = new Date(initDate); 
  var year = formatDate.getFullYear();
  var month = formatDate.getMonth();
  var date = ("0" + formatDate.getDate()).slice(-2);
  var day = formatDate.getDay(); 
  var hour = ("0" + formatDate.getHours()).slice(-2);
  var minute = ("0" + formatDate.getMinutes()).slice(-2);
  var second = ("0" + formatDate.getSeconds()).slice(-2);
  switch (day) {
    case 0: day = "Minggu"; break;
    case 1: day = "Senin"; break;
    case 2: day = "Selasa"; break;
    case 3: day = "Rabu"; break;
    case 4: day = "Kamis"; break;
    case 5: day = "Jum'at"; break;
    case 6: day = "Sabtu"; break;
  }
  switch (month) {
    case 0: month = "Januari"; break;
    case 1: month = "Februari"; break;
    case 2: month = "Maret"; break;
    case 3: month = "April"; break;
    case 4: month = "Mei"; break;
    case 5: month = "Juni"; break;
    case 6: month = "Juli"; break;
    case 7: month = "Agustus"; break;
    case 8: month = "September"; break;
    case 9: month = "Oktober"; break;
    case 10: month = "November"; break;
    case 11: month = "Desember"; break;
  }

  return ({
    second,
    minute,
    hour,
    day,
    date,
    month,
    year
  });
}


export const FormatTime = initDate => {
  const date = new Date(initDate);
  let time = ("0" + date.getHours()).slice(-2) + '.' + ("0" + date.getMinutes()).slice(-2);

  return time;
}