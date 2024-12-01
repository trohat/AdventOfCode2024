console.log("AOC 2024 - Day 1: Historian Hysteria");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(line => line.split(/\s+/).map(Number));

const task1 = data => {
    data = data.rotateRight();
    data[0].sort((a, b) => a - b);
    data[1].sort((a, b) => a - b);
    data = data.rotateLeft();
    let result = 0;
    data.forEach(line => {
        result += Math.abs(line[0] - line[1]);
    });
    return result;
};

const task2 = data => {
    let result = 0;
    data = data.rotateRight();
    data[0].forEach(n => {
        let factor = data[1].countElement(n);
        result += n * factor;
    });
    return result;
}

let testdata = `3   4
4   3
2   5
1   3
3   9
3   3`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 11);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 31);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");