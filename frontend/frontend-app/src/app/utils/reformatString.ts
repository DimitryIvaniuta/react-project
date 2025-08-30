/**
 * Formatting a String (ver. 2)
 *
 * You are given a string to reformat. The string consists of N characters of letters, digits, spaces and/or dashes. The string always contains at least two alphanumeric characters.
 * Spaces and dashes in the string should be ignored. We want to reformat the string so that the characters are grouped in blocks of three, separated by single spaces. If necessary, the final block or the last two blocks can be of length two. Additionally we want to add one semicolon character at the end.
 *
 * For example, given string S = "AA-44 BB 55CD 83FG", we would like to format it as "AA4 4BB 55C D83 FG;".
 *
 * Write a function that, given such a string, returns this string reformatted as described above.
 *
 * For example, given S = "00-44 48 5555 8361", the function should return "004 448 555 583 61;".
 * Given S = "0 - 22 1985--324", the function should return "022 198 53 24;".
 * Given S = "ABC372654", the function should return "ABC 372 654;".
 *
 * You should assume that:
 *
 * N is an integer within the range [2..100];
 *
 * string S consists only of upper or lower case letters (a–z, A–Z), digits (0–9), spaces and/or dashes (-);
 *
 * string S contains at least two characters.
 */

export const reformatString = (s:string) => {                 // Entry point: gets the raw input string s
    const str = s.replace(/[ -]/g, '');      // Remove all spaces and dashes using a regex; keep only letters/digits
    const out = [];                          // Will collect formatted chunks (strings) here
    const n = str.length;                    // Total number of kept characters
                                             // We want groups of 3, except when the remainder would be 1 → then last 4 must be 2+2
    let i = 0;                               // Cursor/index we move through the string

    const limit = (n % 3 === 1) ? n - 4 : n; // If n mod 3 == 1, leave the last 4 chars for special handling (2+2); else process all
                                             // Example: n=10 → 10%3==1 → limit=6, we take 2 groups of 3, leaving 4

    for (; i < limit; i += 3)                // Walk from i to limit in steps of 3…
        out.push(str.slice(i, i + 3));         // …take a substring of 3 chars and push into output

    if (i < n) {                             // Handle the tail (remaining 2, 3, or 4 chars)
        const rem = n - i;                     // How many are left?
        if (rem === 4)                         // If exactly 4 remain…
            out.push(str.slice(i, i + 2),        // …split into two groups of 2
                str.slice(i + 2, i + 4));
        else
            out.push(str.slice(i));              // Otherwise it’s 2 or 3; push as a single final group
    }

    return out.join(' ') + ';';              // Join groups with single spaces and append a semicolon at the end
}