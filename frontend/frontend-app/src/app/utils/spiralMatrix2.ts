export const generateMatrix = (n: number): number[][] => {
    // Create an n x n matrix initialized with 0
    const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    // Define boundaries
    let top = 0;
    let bottom = n - 1;

    let left = 0;
    let right = n - 1;

    // Start filling the matrix with numbers from 1 to n^2
    let current = 1;
    let max = n * n;
    
    while (current <= max) {
        // Traverse from left to right on the top row
        for (let col = left; col <= right; col++) {
            matrix[top][col] = current++;
        }
        top++;

        // Traverse from top to bottom on the right column
        for (let row = top; row <= bottom; row++) {
            matrix[row][right] = current++;
        }
        right--;

        // Traverse from right to left on the bottom row (if still valid)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                matrix[bottom][col] = current++;
            }
            bottom--;
        }

        // Traverse from bottom to top on the left column (if still valid)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                matrix[row][left] = current++;
            }
            left++;
        }
    }

    return matrix;
}
