console.log("AOC 2024 - Day 11: Plutonian Pebbles");

const splitLines = data => data.split(" ").map(Number);

const prepare = data => data;

const task1 = (stones, blinks = 25) => {
    for (let blink = 0; blink < blinks; blink++) {
        for (let i = 0; i < stones.length; i++) {
            if (stones[i] === 0) stones[i] = 1;
            else if (String(stones[i]).length % 2 === 0) {
                let str = String(stones[i]);
                let first = Number(str.substring(0, str.length / 2));
                let second = Number(str.substring(str.length / 2));
                stones.splice(i, 1, first, second);
                i++;
            }
            else stones[i] *= 2024;
        }
        console.log(stones.toString());
    }
    return stones.length;
};

const task2 = data => {
    let engine = data => {
        return data.flatMap(el => {
            if (el === 0) return 1;
            if (String(el).length % 2 === 0) {
                let str = String(el);
                let first = Number(str.substring(0, str.length / 2));
                let second = Number(str.substring(str.length / 2));
                return [first, second];
            }
            return el * 2024;
        });
    };

    let engine2 = dict => {
        let newDict = {};
        for (const [key, val] of Object.entries(dict)) {
            if (key === "0") addToDict(newDict, "1", val);
            else if (key.length % 2 === 0) {
                let first = +key.substring(0, key.length / 2) + "";
                let second = +key.substring(key.length / 2) + "";
                addToDict(newDict, first, val);
                addToDict(newDict, second, val);
            }
            else {
                addToDict(newDict, String(Number(key) * 2024), val);
            }
        }
        return newDict;
    };

    let addToDict = (dict, key, val = 1) => {
        if (key in dict) dict[key] += val;
        else dict[key] = val;
    };

    let toDict = arr => {
        const dict = {};
        for (const el of arr) {
            addToDict(dict, el);   
        }
        return dict;
    };

    data = toDict(data);
    for (let i = 0; i < 75; i++) {
        data = engine2(data);
    }

    console.log(data)
    let sum = 0;
    for (const val of Object.values(data)) sum += val;   
    return sum;
}

let testdata = `125 17`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);
let inputdata2 = [...inputdata];

console.log("");

doEqualTest(task1(testdata), 55312);

console.time("Task 1");
// console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata2));
console.timeEnd("Task 2");