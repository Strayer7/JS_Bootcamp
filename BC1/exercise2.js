function getNOD(first, second) {
    while(second != 0)
    {
        let temp = first%second;
        first = second;
        second = temp;
        
    }
    return first;
}

let array = [[3,6],[0,2],[5,5],[1,3],[0,0]];
for (let i = 0; i < array.length; i ++)
{
    let k = 0;
    console.log(getNOD(array[i][0], array[i][1]));
}