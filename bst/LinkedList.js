import { ListNode } from "./ListNode.js";

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    // Add a value to the end of the linked list.
    append(value) {
        if (this.size === 0) {
            this.head = new ListNode(value);
            this.tail = this.head;
        } else {
            this.tail.next = new ListNode(value, null, this.tail);
            this.tail = this.tail.next;
        }
        this.size += 1;
    }
    // Add a value to the beginning of the linked list.
    prepend(value) {
        if (this.size === 0) {
            this.head = new ListNode(value);
            this.tail = this.head;
        } else {
            let newHead = new ListNode(value, this.head);
            this.head.prev = newHead;
            this.head = newHead;
        }
        this.size += 1;
    }

    // Return the node at the given index.
    at(index) {
        let idx = 0;
        let curNode = this.head;
        for (idx; idx < this.size && idx < index; ++idx) {
            curNode = curNode.next;
        }
        return curNode;
    }

    // Remove and return the value of last element from the list.
    pop() {
        if (this.size === 0) return;
        let tailNode = this.tail;
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
        this.size -= 1;
        // If we popped the only element, set head to null.
        if (this.size === 0) {
            this.head = null;
        }
        return tailNode.data;
    }
    // Returns true if the value is in the list.
    contains(value) {
        let curNode = this.head;
        while (curNode !== null) {
            if (curNode.data === value) return true;
            curNode = curNode.next;
        }
        return false;
    }
    // Returns the index of the node containing value, and null if not found.
    find(value) {
        let idx = 0;
        let curNode = this.head;
        for (idx; idx < this.size; ++idx) {
            if (curNode.data === value) return true;
            curNode = curNode.next;
        }
        return null;
    }

    toString() {
        let output = "";
        let curNode = this.head;
        while (curNode !== null) {
            output += output
                ? ` -> ( ${curNode.data} )`
                : `( ${curNode.data} )`;
            curNode = curNode.next;
        }
        output += this.size === 0 ? "null" : " -> null";
        return output;
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size) {
            throw new Error("Not a valid index");
        } else if (index === 0) {
            this.prepend(value);
        } else if (index === this.size) {
            this.append(value);
        } else {
            let nodeBefore = this.at(index - 1);
            let nodeAfter = this.at(index);

            let newNode = new ListNode(value, nodeAfter, nodeBefore);
            nodeBefore.next = newNode;
            nodeAfter.prev = newNode;

            this.size += 1;
        }
    }

    removeAt(index) {
        if (index < 0 || index > this.size) {
            throw new Error("Not a valid index");
        } else if (index === 0) {
            this.head = this.head.next;
        } else if (index === this.size) {
            this.pop();
        } else {
            let nodeBefore = this.at(index - 1);
            let nodeAfter = this.at(index + 1);
            nodeBefore.next = nodeAfter;
            nodeAfter.prev = nodeBefore;

            this.size -= 1;
        }
    }
}

export { LinkedList };
