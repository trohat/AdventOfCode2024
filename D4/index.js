console.log("AOC 2024 - Day 4: Ceres Search");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(line => line.split(""));

const task1 = data => {
    const outOfBorders = (bi, bj, grid) => {
        if (bi<0) return true;
        if (bj<0) return true;
        if (bi >= grid.length) return true;
        if (bj >= grid[0].length) return true;
        return false;
    };
    result = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            let char = data[i][j];
            if (char === "X") {
                for (const dir of diagonalDirs) {
                    let tempI = i + dir.y;
                    let tempJ = j + dir.x;
                    // console.log("test for M before break", i,j, tempI, tempJ)
                    if (outOfBorders(tempI, tempJ, data)) continue;
                    // console.log("test for M ", i,j, tempI, tempJ)
                    if (data[tempI][tempJ] === "M") {
                        tempI += dir.y;
                        tempJ += dir.x;
                        if (outOfBorders(tempI, tempJ, data)) continue;
                        if (data[tempI][tempJ] === "A") {
                            tempI += dir.y;
                            tempJ += dir.x;
                            if (outOfBorders(tempI, tempJ, data)) continue;
                            if (data[tempI][tempJ] === "S") {
                                // console.log(i,j, tempI, tempJ)
                                result++
                            };
                        }
                    }
                }
            }
        }
    }
    return result;
};

const task2 = data => {
    const outOfBorders = (bi, bj, grid) => {
        if (bi<0) return true;
        if (bj<0) return true;
        if (bi >= grid.length) return true;
        if (bj >= grid[0].length) return true;
        return false;
    };
    result = 0;
    for (let i = 0; i < data.length; i++) {
        l1: for (let j = 0; j < data.length; j++) {
            let char = data[i][j];
            if (char === "A") {
                let neigbours = [];
                for (const dir of onlyDiagonalDirs) {
                    if (outOfBorders(i + dir.y, j + dir.x, data)) continue l1;
                    neigbours.push(data[i + dir.y][j + dir.x]);
                }
                if (data[i + onlyDiagonalDirs[0].y][j + onlyDiagonalDirs[0].x] === data[i + onlyDiagonalDirs[3].y][j + onlyDiagonalDirs[3].x]) continue;
                neigbours.sort();
                if (neigbours.join("") === "MMSS") {
                    result++;
                }
            }
        }
    }
    return result;
}

let testdata = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 18);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 9);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");