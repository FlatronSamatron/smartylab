function flatten(arr, depth) {
  function helper(arr, currentDepth) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && currentDepth < depth) {
        result = result.concat(helper(arr[i], currentDepth + 1));
      } else {
        result.push(arr[i]);
      }
    }

    return result;
  }

  return helper(arr, 0);
}

// Примеры:
console.log(flatten([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 0)); //[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

console.log(flatten([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1)); //[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

console.log(flatten([[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 2)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]