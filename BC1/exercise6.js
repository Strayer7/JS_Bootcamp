
function sma(arrayOfNumbers, period) {
    let arr = [];
    let sumNum = 0;
    for(let i = 0; i < arrayOfNumbers.length; i++)
    {
        sumNum += arrayOfNumbers[i];
        arr.push(sumNum/period);
    }
    return arr;
}

console.log(sma([1,2,3], 3));