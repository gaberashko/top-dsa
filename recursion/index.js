function sumRange(n) {
    if (n === 1) {
        return 1;
    } else {
        return n + sumRange(n - 1);
    }
}

// console.log(sumRange(5));

function power(x, n) {
    if (n === 0) {
        return 1;
    }
    if (n % 2 === 0) {
        return power(x * x, n / 2);
    } else {
        return x * power(x, n - 1);
    }
}

// console.log(power(5, 7));

function fact(n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * fact(n - 1);
    }
}

// console.log(fact(7));

function all(arr, callback) {
    var copy = arr.slice();
    if (copy.length === 0) return true;
    if (callback(copy[0])) {
        // Remove first element, then continue with array.
        copy.shift();
        return all(copy, callback);
    } else {
        return false; // If a child didn't satisfy callback, return false.
    }
}

/*
console.log(
    all([1, 2, 9], function (num) {
        return num < 7;
    })
); // False

console.log(
    all([1, 2, 6], function (num) {
        return num < 7;
    })
); // True
*/

function productOfArray(arr) {
    var copy = arr.slice();
    if (arr.length === 0) {
        return 0;
    } else if (arr.length === 1) {
        return arr[0];
    } else {
        copy.shift();
        return arr[0] * productOfArray(copy);
    }
}

// console.log(productOfArray([1, 6, 7])); // 42
// console.log(productOfArray([])); // 0;
// console.log(productOfArray([6])); // 6

function contains(obj, val) {
    // Prevents us from accessing properties that might not exist on obj.
    if (typeof obj !== "object" || obj === null) {
        // Base case
        return obj === val;
    }
    for (const value of Object.values(obj)) {
        // Recursive part.
        if (contains(value, val)) {
            return true;
        }
    }
    // Went through all things in object and didn't find value.
    return false;
}

var nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: "foo2",
                    },
                },
            },
        },
    },
};

let hasIt = contains(nestedObject, 44); // true
let doesntHaveIt = contains(nestedObject, "foo"); // false
// console.log(hasIt, doesntHaveIt);

function totalIntegers(arr) {
    if (arr.length === 0) return 0;

    let total = 0;
    let first = arr.shift();

    if (Array.isArray(first)) {
        total += totalIntegers(first);
    } else if (Number.isInteger(first)) {
        total += 1;
    }

    return total + totalIntegers(arr);
}

var seven = totalIntegers([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]]); // 7
// console.log(seven);

function sumSquares(arr) {
    // Base case to end recursion.
    if (arr.length === 0) return 0;

    let total = 0;
    let first = arr.shift();

    if (Array.isArray(first)) {
        // first is an array, so do the same function on this sub-array.
        total += sumSquares(first);
    } else {
        // first is a number, so add its square to the total.
        total += first * first;
    }
    // Add the current total to the total gained from the rest of the array.
    return total + sumSquares(arr);
}

var l = [1, 2, 3];
// console.log(sumSquares(l)); // 1 + 4 + 9 = 14

l = [[1, 2], 3];
// console.log(sumSquares(l)); // 1 + 4 + 9 = 14

l = [[[[[[[[[1]]]]]]]]];
// console.log(sumSquares(l)); // 1 = 1

l = [10, [[10], 10], [10]];
// console.log(sumSquares(l)); // 100 + 100 + 100 + 100 = 400

function replicate(n, val) {
    // Base case to end recursion.
    if (n <= 0) return [];

    return [val, ...replicate(n - 1, val)];
}

// console.log(replicate(3, 5)); // [5, 5, 5]
// console.log(replicate(1, 69)); // [69]
// console.log(replicate(-2, 6)); // []

// Iterative fibonacci sequence solution.
function fibs(n) {
    let numSequence = [];
    for (let i = 0; i < n; ++i) {
        if (i === 0) {
            numSequence.push(0);
        } else if (i === 1) {
            numSequence.push(1);
        } else {
            numSequence.push(numSequence[i - 1] + numSequence[i - 2]);
        }
    }
    return numSequence;
}

// console.log(fibs(8));

// Recursive fibonacci sequence solution.
function fibsRec(n, res = [0, 1]) {
    if (n === 0) return [];
    // If we have the value for the sequence, then return it without recalculating.
    if (res[n]) {
        return res[n];
    }
    // Otherwise, we must calculate it.
    res[n] = fibsRec(n - 1, res) + fibsRec(n - 2, res);
    return res[n];
}

// console.log(fibs(8));
// console.log(fibs(1));
// console.log(fibs(2));
// console.log(fibs(0));
// console.log(fibs(3));

function mergeSort(arr) {
    // Base case, array is size 1;
    if (arr.length <= 1) {
        return arr;
    } else {
        let leftHalf = mergeSort(arr.slice(0, arr.length / 2));
        let rightHalf = mergeSort(arr.slice(arr.length / 2));

        return helper(leftHalf, rightHalf);
    }

    // Performs the merging of both halves of an array (each half as input).
    function helper(arr1, arr2) {
        let sortedArray = [];
        let cur1 = arr1.shift();
        let cur2 = arr2.shift();
        // Run while an element exists in one of the arrays.
        while (cur1 !== undefined || cur2 !== undefined) {
            // cur1 is empty.
            if (cur1 == undefined) {
                sortedArray.push(cur2);
                cur2 = arr2.shift();
            } else if (cur2 == undefined) {
                // cur2 is empty
                sortedArray.push(cur1);
                cur1 = arr1.shift();
            } else {
                // Both have a value, so insert the smaller
                if (cur1 <= cur2) {
                    sortedArray.push(cur1);
                    cur1 = arr1.shift();
                } else {
                    sortedArray.push(cur2);
                    cur2 = arr2.shift();
                }
            }
        }
        return sortedArray;
    }
}

console.log(mergeSort([]));
console.log(mergeSort([73]));
console.log(mergeSort([1, 2, 3, 4, 5]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));


