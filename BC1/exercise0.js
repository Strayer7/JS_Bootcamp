function range(start,end)
{
    let array = [];
    for (let i = start; i < end+1; i++)
    {
        array.push(i);
    }

    console.log(array);
    return array;
}

range(0,5);

range(3,3);

range(8,0);

range(0,0);
