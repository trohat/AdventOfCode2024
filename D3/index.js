console.log("AOC 2024 - Day 3: Mull It Over");

const task1 = data => {
    let result = 0;
    for (const matchObj of data.matchAll(/mul\((\d+),(\d+)\)/g)) {
        result += +matchObj[1] * +matchObj[2];
    }
    return result;
};

const task2 = data => {
    let result = 0;
    data = "startX" + data + "endX";
    for (const matchObj of data.matchAll(/(do\(\)|startX)(.*?)(don\'t\(\)|endX)/gs)) {
        result += task1(matchObj[2]);
    }
    return result;
}

let testdata = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
let testdata2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

console.log("");

doEqualTest(task1(testdata), 161);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata2), 48);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");