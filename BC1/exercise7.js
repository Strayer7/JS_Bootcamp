function mergeSort(arrayOfNumbers) {
    if(arrayOfNumbers.length <= 1)
    {
        return arrayOfNumbers;
    }
        let mid = Math.ceil(arrayOfNumbers.length / 2)
        let right = mergeSort(arrayOfNumbers.slice(0,mid));
        let left = mergeSort(arrayOfNumbers.slice(mid));

    return merge(left,right);

}

function merge(left,right)
{
    let result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]); 
            i++;                  
        } else {
            result.push(right[j]);
            j++;                  
        }
    }

    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result; 
}

let arr = [1,4,3,5,8,9,2,6];

console.log(mergeSort(arr));