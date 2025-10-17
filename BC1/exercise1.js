function getNumbersIdBySum(arrayOfNumbers, sum) {
    let results = []; 

    for (let i = 0; i < arrayOfNumbers.length; i++) {
        for (let j = i + 1; j < arrayOfNumbers.length; j++) { 
            if (arrayOfNumbers[i] + arrayOfNumbers[j] === sum) {
                results.push([i, j]); 
            }
        }
    }

    return results.length > 0 ? results : null; 
}


let array = [[1,2,3,4,5],[1,0,5],[1, 0],[1,2,3,4,5]];
let number = [6,2,1,0];

for(let i = 0;i < array.length; i++)
{
    let resArray = getNumbersIdBySum(array[i],number[i]);
    console.log(resArray);
}



