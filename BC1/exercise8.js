function binarySearch(arrayOfNumbers, num) {
    
    let left = 0;
    let right = arrayOfNumbers.length-1;
    let mid = Math.floor((left+right)/2);
    while(left <= right)
    {
        if (arrayOfNumbers[mid] == num)
        {
            return mid;
        }else if(arrayOfNumbers[mid] < num){
            left = mid + 1;
            mid = Math.floor((left+right)/2);
        }else{
            right = mid - 1;
            mid = Math.floor((left+right)/2);
        }

    }
    return mid;
}

let arr = [-10, -5, 0, 5, 10];

console.log(binarySearch(arr,0));