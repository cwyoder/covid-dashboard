export const intervalAverages = (array, interval) => {
  return array.map((val, idx, arr) => {
    if (idx < interval - 1) return 0;
    const subArr = arr.slice((idx + 1 - interval), idx + 1);
    return (subArr.reduce((acc, el)=> acc + el) / interval);
  })
}
