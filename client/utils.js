export const intervalAverages = (array, interval, key) => {
  return array.map((obj, idx, arr) => {
    let avg = 0;
    if (idx < interval - 1) {
      obj.average = avg;
      return obj;
    }
    const subArr = arr.slice((idx + 1 - interval), idx + 1);
    avg = (subArr.reduce((acc, el)=> acc + el[key], 0) / interval);
    // console.log(idx, subArr, avg);
    obj.average = avg;
    return obj;
  })
}

export const dateConverter = dateStr => {
  console.log(dateStr);

  if (typeof dateStr === 'number') {
    const newStr = String(dateStr);
    const year = newStr.substring(0,4);
    const month = newStr.substring(4,6);
    const day = newStr.substring(6,8);

    const date = new Date(year, month-1, day);
    console.log(date);
    return date;
  }
  return dateStr;
}
