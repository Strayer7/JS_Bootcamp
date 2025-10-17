function getMaxZeroCount(raw) {
    let maxCount = 0;
    let current = 0;
    for (let i = 0; i < raw.length; i++) {
        if (raw[i] === '0') {
            current++;
        } else {
            if (current > maxCount) {
                maxCount = current;
            }
            current = 0;
        }
    }

    if (current > maxCount) {
        maxCount = current;
    }

    return maxCount;
}

let string = "001010101000001000";
console.log(getMaxZeroCount(string));