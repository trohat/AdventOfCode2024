console.log("AOC 2024 - Day 2: Red-Nosed Reports");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(line => line.split(" ").map(Number));

const isSafe = line => {
    let inc = Math.sign(line[1] - line[0]);
    for (let i = 1; i < line.length; i++) {
        if (line[i] === line[i-1]) return false;
        if (Math.abs(line[i] - line[i-1]) > 3) return false;
        if (Math.sign(line[i] - line[i-1]) !== inc) return false;
    }
    return true;
}

const task1 = data => {
    safe = 0;
    for (const line of data) {
        safe += isSafe(line) ? 1 : 0;
    }
    return safe;
};

const task2 = data => {
    const isRemovalSafe = line => {
        if(isSafe(line)) return true;
        for (let i = 0; i < line.length; i++) {
            let newLine = [...line];
            newLine.splice(i, 1);
            if (isSafe(newLine)) return true;
        }
        return false;
    }
    safe = 0;
    for (const line of data) {
        safe += isRemovalSafe(line) ? 1 : 0;
    }
    return safe;
}

let testdata = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 2);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 4);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");