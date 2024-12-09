console.log("AOC 2024 - Day 6: Guard Gallivant");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let indices;
    data.forEach((line, rowIndex) => {
        [...line].forEach((char, colIndex) => {
            if (char === "^") {
                indices = [rowIndex, colIndex];
            }
        });
    });
    return [indices, data];
};

const task1 = ([indices, data]) => {
    const isWall = (r, c, data) => {
        return data[r][c] === "#";
    };

    const outOfBorders = (r, c, grid) => {
        if (r < 0) return true;
        if (c < 0) return true;
        if (r >= grid.length) return true;
        if (c >= grid[0].length) return true;
        return false;
    };

    let dir = "U";
    let r = indices[0];
    let c = indices[1];
    let steps = new Set();
    while (true) {
        steps.add(`${r}-${c}`);
        let newR = r + charsToDirs.get(dir).y;
        let newC = c + charsToDirs.get(dir).x;
        if (outOfBorders(newR, newC, data)) return steps.size;
        if (isWall(newR, newC, data)) {
            dir = rightTurnsInChars.get(dir);
            continue;
        }
        r = newR;
        c = newC;
    }
}

const task2 = ([indices, data]) => {
    const guardIsStuck = (r, c, grid) => {
        let dir = "U";
        let steps = new Set();
        while (true) {
            let pos = `${r}-${c}-${dir}`;
            if (steps.has(pos)) return true;
            steps.add(pos);
            let newR = r + charsToDirs.get(dir).y;
            let newC = c + charsToDirs.get(dir).x;
            if (outOfBorders(newR, newC, grid)) return false;
            if (isWall(newR, newC, data)) {
                dir = rightTurnsInChars.get(dir);
                continue;
            }
            r = newR;
            c = newC;
        }
    };

    const isWall = (r, c, gird) => {
        return gird[r][c] === "#";
    };

    const outOfBorders = (r, c, grid) => {
        if (r < 0) return true;
        if (c < 0) return true;
        if (r >= grid.length) return true;
        if (c >= grid[0].length) return true;
        return false;
    };

    let startR = indices[0];
    let startC = indices[1];
    let obstructionCount = 0;
    data.forEach((line, rowIndex) => {
        [...line].forEach((char, colIndex) => {
            if (char === ".") {
                data[rowIndex] = data[rowIndex].setCharAt(colIndex, "#");
                if (guardIsStuck(startR, startC, data)) obstructionCount++;
                data[rowIndex] = data[rowIndex].setCharAt(colIndex, ".");
            }
        });
    });
    return obstructionCount;
};

let testdata = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");
7
doEqualTest(task1(testdata), 41);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 6);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");