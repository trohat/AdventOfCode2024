console.log("AOC 2024 - Day 7: Bridge Repair");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const equations = [];
    for (const line of data) {
        let act = []
        let [ res, eq ] = line.split(": ");
        act.push(Number(res));
        for (const n of eq.split(" ")) act.push(Number(n));
        equations.push(act);
    }
    return equations;
};

const task1 = data => {
    const evaluate = (result, numbers) => {
        if (numbers.length === 1) {
            if (numbers[0] === result) return true;
            return false;
        }
        numbers = [...numbers];
        const plus = numbers[0] + numbers[1];
        const times = numbers[0] * numbers[1];
        return evaluate(result, [plus].concat(numbers.slice(2))) || evaluate(result, [times].concat(numbers.slice(2)));
    }

    result = 0;
    for (const line of data) {
        if (evaluate(line[0], line.slice(1))) result += line[0];
    }
    return result;
};

const task2 = data => {
    const evaluate = (result, numbers) => {
        if (numbers.length === 1) {
            if (numbers[0] === result) return true;
            return false;
        }
        //numbers = [...numbers];
        const plus = numbers[0] + numbers[1];
        const times = numbers[0] * numbers[1];
        const concat = Number(String(numbers[0]) + String(numbers[1]));
        return evaluate(result, [plus].concat(numbers.slice(2))) 
            || evaluate(result, [times].concat(numbers.slice(2))) 
            || evaluate(result, [concat].concat(numbers.slice(2)));
    }

    result = 0;
    for (const line of data) {
        if (evaluate(line[0], line.slice(1))) result += line[0];
    }
    return result;
};

let testdata = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 3749);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 11387);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");