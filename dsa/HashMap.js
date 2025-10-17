import { LinkedList } from "./LinkedList.js";

class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.recordCount = 0;
        // Field containing the linked list buckets.
        this.buckets = Array.from(
            { length: this.capacity },
            (_) => new LinkedList()
        );
    }

    // Takes a key and outputs a hash code for it.
    hash(key) {
        let hashCode = 0;

        const prime = 31;
        for (let i = 0; i < key.length; ++i) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    // Sets a key-value pair. If the key exists, the old value is overwritten.
    set(key, value) {
        // If we exceed load factor, double the capacity of the map and re-insert all entries.
        if (
            Number((this.recordCount / this.capacity).toFixed(2)) >=
            this.loadFactor
        ) {
            this.doubleSize();
        }

        const index = this.hash(key);
        const bucket = this.buckets[index];
        const record = [key, value];

        let curNode = bucket.head;

        if (index < 0 || index >= this.buckets.length)
            throw new Error("Trying to access index out of bounds");
        // Bucket exists, so search if key already exists here.
        while (curNode !== null) {
            if (curNode.data[0] === key) {
                curNode.data[1] = value;
                return;
            }
            curNode = curNode.next;
        }
        bucket.append(record);
        this.recordCount += 1;
    }

    // Returns the value assigned to the key. If the key is not found, returns null.
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        let curNode = bucket.head;
        while (curNode !== null) {
            if (curNode.data[0] === key) {
                return curNode.data[1];
            }
            curNode = curNode.next;
        }
        // No key found in the bucket.
        return null;
    }

    // If the key is in map, remove entry and return true, otherwise false.
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        let i = 0;
        let curNode = bucket.head;

        while (curNode !== null) {
            if (curNode.data[0] === key) {
                bucket.removeAt(i);
                this.recordCount -= 1;
                return true;
            }
            curNode = curNode.next;
            i += 1;
        }
        // Key was not found.
        return false;
    }

    // Returns the number of stored keys in the hash map.
    length() {
        return this.buckets.reduce((keys, bucket) => keys + bucket.size, 0);
    }

    // Removes all entries in the hash map.
    clear() {
        this.buckets = Array.from(
            { length: this.capacity },
            (_) => new LinkedList()
        );
        this.recordCount = 0;
    }

    // Returns array containing all keys stored in the hash map.
    keys() {
        let keys = [];
        for (const bucket of this.buckets) {
            let curNode = bucket.head;

            while (curNode !== null) {
                keys.push(curNode.data[0]);
                curNode = curNode.next;
            }
        }
        return keys;
    }

    // Returns array containing all values stored in the hash map.
    values() {
        let values = [];

        for (const bucket of this.buckets) {
            let curNode = bucket.head;
            while (curNode !== null) {
                values.push(curNode.data[1]);
                curNode = curNode.next;
            }
        }
        return values;
    }

    // Returns array containing all key, value pairs in the hash map.
    entries() {
        let entries = [];

        for (const bucket of this.buckets) {
            let curNode = bucket.head;
            while (curNode !== null) {
                entries.push([...curNode.data]);
                curNode = curNode.next;
            }
        }
        return entries;
    }

    // Doubles the map's capacity, and re-inserts all pre-existing entries.
    doubleSize() {
        this.capacity *= 2;
        // Get the current keys in the map, and remake the map.
        const existingEntries = this.entries();
        this.clear();

        for (const entry of existingEntries) {
            const [key, value] = entry;
            this.set(key, value);
        }
    }
}

let h = new HashMap();
h.set("a", 14);
h.set("caaca", "poo");
h.set("apple", "red");
h.set("banana", "yellow");
h.set("carrot", "orange");
h.set("dog", "brown");
h.set("elephant", "gray");
h.set("frog", "green");
h.set("grape", "purple");
h.set("hat", "black");
h.set("ice cream", "white");
h.set("jacket", "blue");
h.set("kite", "pink");
h.set("lion", "golden");
console.log(h.keys());
console.log(h.values());
console.log(h.recordCount, h.capacity);
console.log(h.length());

console.log(JSON.stringify(h.entries()).replace(/,/g, ", "));

console.log(h.get("a"));
h.remove("a");
console.log(h.get("a"));

h.clear();
console.log(h.entries());
