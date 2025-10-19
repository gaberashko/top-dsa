import { LinkedList } from "./LinkedList.js";
// Takes start and end coordinates on a chess board and returns the shortest possible way to get from one square to another.
function knightMoves(start, end) {
    const visited = new Set();
    const moves = new LinkedList();
    // Check if user input is correct.
    if (!isValid(start) || !isValid(end))
        throw new Error("Position arguments are not valid.");

    moves.prepend([start, [start]]);

    while (moves.size !== 0) {
        let [position, path] = moves.pop();

        if (position[0] === end[0] && position[1] === end[1]) {
            console.log(
                `The shortest path is ${path.length} steps:\n`,
                JSON.stringify(path).replace(/,/g, ", ")
            );
            return path;
        }

        visited.add(String(position));
        // Add the possible next steps to the queue if valid, and not visited.
        let possibleMoves = [
            [position[0] + 1, position[1] + 2],
            [position[0] + 2, position[1] + 1],
            [position[0] + 1, position[1] - 2],
            [position[0] + 2, position[1] - 1],
            [position[0] - 1, position[1] - 2],
            [position[0] - 2, position[1] - 1],
            [position[0] - 1, position[1] + 2],
            [position[0] - 2, position[1] + 1],
        ];
        for (let move of possibleMoves) {
            // Add if valid and not visited yet.
            if (isValid(move) && !visited.has(String(move))) {
                moves.prepend([move, [...path, move]]);
            }
        }
    }
}

// Return whether the position is a valid space on the board.
function isValid(position) {
    let [x, y] = position;
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

knightMoves([0, 0], [1, 2]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
