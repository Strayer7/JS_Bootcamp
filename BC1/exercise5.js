/*
const a = "def";
const b = "efc";
const c = "abe";
const d = "cba";
const e = "fba";
const f = "dcb";

function alphabetMap(rawString, mapCount) {
    let res = "";
    for (let j = 0;j < mapCount; j++)
    { res = "";
        for(let i = 0; i < rawString.length; i++)
    {
        if (rawString[i] == 'a')
        {
            res += a;
        }else if(rawString[i] == 'b')
        {
            res+=b;
        }else if(rawString[i] == 'c')
        {
            res+=c;
        }else if(rawString[i] == 'd')
        {
            res+=d;
        }else if(rawString[i] == 'e')
        {
            res+=e;
        }else if(rawString[i] == 'f')
        {
            res+=f;
        }
    }
    rawString=res;
}
    return rawString;
}

console.log(alphabetMap("abcdef",1));
console.log(alphabetMap("aa",2));
console.log(alphabetMap("bad",1));
*/

const mappings = {
    a: "def",
    b: "efc",
    c: "abe",
    d: "cba",
    e: "fba",
    f: "dcb"
};

function alphabetMap(rawString, mapCount) {
    if (mapCount <= 0) return rawString;

    for (let j = 0; j < mapCount; j++) {
        rawString = [...rawString]
            .map(char => mappings[char] || char)
            .join('');                          
    }

    return rawString; 
}


console.log(alphabetMap("abcdef",1));
console.log(alphabetMap("aa",2));
console.log(alphabetMap("bad",1));