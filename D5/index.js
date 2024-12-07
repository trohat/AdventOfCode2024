console.log("AOC 2024 - Day 5: Print Queue");

const splitLines = data => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    let rules = [], pages = [];
    for (const line of data[0].split("\n")) {
        rules.push(line.split("|").map(Number))
    }
    for (const line of data[1].split("\n")) {
        pages.push(line.split(",").map(Number))
    }
    return [rules, pages];
};

const task1 = data => {
    let result = 0;
    pageLoop: for (const page of data[1]) {
        for (const rule of data[0]) {
            if (page.indexOf(rule[0]) !== -1 && page.indexOf(rule[1]) !== -1 && page.indexOf(rule[1]) < (page.indexOf(rule[0]))) continue pageLoop;
        }
        result += page[Math.floor(page.length / 2)]
    }
    return result;
};

const task2 = data => {
    let result = 0;
    for (const page of data[1]) {
        let changed = true;
        while (changed) {
            changed = false;
            for (const rule of data[0]) {
                if (page.indexOf(rule[0]) === -1 || page.indexOf(rule[1]) === -1) continue;
                if (page.indexOf(rule[1]) < (page.indexOf(rule[0]))) {
                    const first = page.indexOf(rule[1]);
                    const second = page.indexOf(rule[0]);
                    const temp = page[first];
                    page[first] = page[second];
                    page[second] = temp;
                    changed = true;
                }
            }
        }
        result += page[Math.floor(page.length / 2)]
    }
    return result;
}

let testdata = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 143);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 123 + 143);
console.time("Task 2");
console.log("Task 2: " + (task2(inputdata) - 5108));
console.timeEnd("Task 2");