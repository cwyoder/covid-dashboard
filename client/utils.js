export const intervalAverages = (array, interval, key) => {
  return array.map((obj, idx, arr) => {
    let avg = 0;
    if (idx < interval - 1) {
      obj.average = avg;
      return obj;
    }
    const subArr = arr.slice((idx + 1 - interval), idx + 1);
    avg = (subArr.reduce((acc, el)=> acc + el[key], 0) / interval);
    console.log(idx, subArr, avg);
    obj.average = avg;
    return obj;
  })
}
