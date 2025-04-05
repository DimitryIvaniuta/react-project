// Definition for singly-linked list.
class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Adds two numbers represented by linked lists (digits stored in reverse order)
 * and returns the sum as a linked list (also in reverse order).
 *
 * @param l1 The head of the first linked list.
 * @param l2 The head of the second linked list.
 * @returns The head of the linked list representing the sum.
 */
export const addTwoNumbers = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        const x = l1 ? l1.val : 0;
        const y = l2 ? l2.val : 0;
        const sum = x + y + carry;

        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummyHead.next;
}

/**
 * Utility function to create a linked list from an array of numbers.
 *
 * @param arr An array of numbers.
 * @returns The head of the newly created linked list.
 */
function createList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

/**
 * Utility function to print the linked list in a readable format.
 *
 * @param head The head of the linked list to print.
 */
function printList(head: ListNode | null): void {
    let current = head;
    let output = "";
    while (current !== null) {
        output += current.val;
        if (current.next !== null) {
            output += " -> ";
        }
        current = current.next;
    }
    console.log(output);
}

// Application entry point demonstrating the algorithm
(function main() {
    // Represent numbers in reverse order.
    // Example: 342 is represented as [2, 4, 3]
    const num1 = [2, 4, 3];  // Represents the number 342
    const num2 = [5, 6, 4];  // Represents the number 465

    // Create linked lists from the input arrays.
    const l1 = createList(num1);
    const l2 = createList(num2);

    console.log("List 1:");
    printList(l1);

    console.log("List 2:");
    printList(l2);

    // Compute the sum.
    const result = addTwoNumbers(l1, l2);

    console.log("Sum:");
    printList(result);
})();
