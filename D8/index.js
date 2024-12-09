console.log("AOC 2024 - Day 8: Resonant Collinearity");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const antennas = {};
    data.forEach((line, rowIndex) => {
        [...line].forEach((char, colIndex) => {
            if (char !== ".") {
                if (!(char in antennas)) {
                    antennas[char] = [];
                }
                antennas[char].push(`${rowIndex}-${colIndex}`)
            }
        });
    });
    return [antennas, data];
};

const task1 = ([antennas, data]) => {
    const insideBorders = (r, c, grid) => {
        if (r < 0) return false;
        if (c < 0) return false;
        if (r >= grid.length) return false;
        if (c >= grid[0].length) return false;
        return true;
    };
    let antinodes = new Set();
    for (const [, positions] of Object.entries(antennas)) {
        for (const pos1 of positions)
            for (const pos2 of positions) {
                if (pos1 === pos2) continue;
                const [r1, c1] = pos1.split("-").map(Number);
                const [r2, c2] = pos2.split("-").map(Number);
                let newR = r1 + r1 - r2;
                let newC = c1 + c1 - c2;
                if (insideBorders(newR, newC, data)) antinodes.add(`${newR}-${newC}`)
            }
    }
    return antinodes.size;
};

const task2 = ([antennas, data]) => {
    const insideBorders = (r, c, grid) => {
        if (r < 0) return false;
        if (c < 0) return false;
        if (r >= grid.length) return false;
        if (c >= grid[0].length) return false;
        return true;
    };
    let antinodes = new Set();
    for (const [, positions] of Object.entries(antennas)) {
        for (const pos1 of positions)
            for (const pos2 of positions) {
                if (pos1 === pos2) continue;
                const [r1, c1] = pos1.split("-").map(Number);
                const [r2, c2] = pos2.split("-").map(Number);
                antinodes.add(`${r1}-${c1}`);
                antinodes.add(`${r2}-${c2}`);
                let newR = r1 + r1 - r2;
                let newC = c1 + c1 - c2;
                while (insideBorders(newR, newC, data)) {
                    antinodes.add(`${newR}-${newC}`);
                    newR += r1 - r2;
                    newC += c1 - c2;
                }
            }
    }
    return antinodes.size;
}

let testdata = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 14);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 34);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");