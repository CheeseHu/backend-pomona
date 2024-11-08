function handleNullValues(arr) {
  // Validate first and final item of array
  if (!arr[0]) {
    if (!arr[1]) {
      arr[1] = arr[2];
    }
    arr[0] = arr[1];
  }
  if (!arr[arr?.length - 1]) {
    if (!arr[arr?.length - 2]) {
      arr[arr?.length - 2] = arr[arr?.length - 3];
    }
    arr[arr?.length - 1] = arr[arr?.length - 2];
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null || arr[i] === undefined) {
      let prev = i > 0 ? arr[i - 1] : 0;
      let next = i < arr.length - 1 ? arr[i + 1] : 0;

      // Only average if next value is not null or undefined
      if (next === null || next === undefined) {
        next = 0; // or handle differently if needed
      }

      // If both previous and next are 0, assign 0 to avoid division by zero
      arr[i] = prev + next === 0 ? 0 : (prev + next) / 2;
    }
  }
  return arr;
}

module.exports = { handleNullValues };
