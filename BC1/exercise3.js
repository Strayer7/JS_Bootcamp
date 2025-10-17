function getSimpleNumbers(touple) {
    let array = [];
    for (let i = touple[0]; i < touple[1] + 1 ; i++)
    {
        array.push(i);
    }
    for (let i= 0; i < array.length; i++)
    {
        for (let j = i + 1; j < array.length;j++)
        {
            if (array[j] % array[i] == 0)
            {
                array.splice(j,1);
                j--;
            }
        }
    }
    return array;
}

const nums = [[2,2],[2,10],[2,100]];
for (let i = 0; i < nums.length;i++)
{
    console.log(getSimpleNumbers(nums[i]));
}