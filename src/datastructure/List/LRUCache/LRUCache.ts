class Node<K, V> {
    key: K | null = null;
    value: V | null = null;
    prev: Node<K, V> | null = null;
    next: Node<K, V> | null = null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}





/**
 * 
 * Contract:
 *      Goals: Build a working hash map enough to support the LRU O(1) operations.
 *      Constraints: No built in  Map, Set
 *     Must have O(1) get and put operations.
 * 
 * Concept:
 *  - Hash map is a bucketed array basically an array of KvP with an array or linked list attached to each index
 *  - Hash map index might have duplicate (collision) we need to know to handle collisions
 *   - Collision is handled with chaining basically your linked list
 *   Operations:
 *      - Compute hash key to index for fast look ups
 *      - Handle collisions with chaining
 *     -  Basic ops: get, put, remove, size
 *    Constraints of these ops: O(1) average TC
 * 
 *  Design:
 *    - Use generics type of K,V for KvP
 *    - A Entry class (Dumb) to represent 1 KvP
 *    - A bucket class to own the list for chaining. Chain the Entry object together. Simple array(easier)
 *   - The HashMap class to own the bucket in a form of array and provide the operations
 *    - Hashmap
 *      - Bucket
 *         - Entry
 *            - k
 *            - v
 *    - To handle collision and store KvP at a certain index, use a hash function to compute index from key) -> O(1) look but still look up over the linked list at that index though linked is O(1) as well.
 *      - HashFunction = key % capacity = index -> the house four the the entry 
 *    - To find the size is the size of the array of Hashmap array
 * 
 * - Operations algorithm high level:
 *  - hashFunction(key) -> index
 *  - put(key, value): void
 *  - get(key): V | null
 *   - size(): number

 */

export class Entry<K, V> {
    key: K; value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export class Bucket<K, V> {
    entries: Entry<K, V>[] = [];

    constructor() { }
}

export class HashMap<K, V> {
    Buckets: Bucket<K, V>[] = [];
    Capacity: number = 16;
    private _size: number = 0;
    constructor(capacity: number = 16) {
        this.Capacity = capacity;
        this.Buckets = new Array<Bucket<K, V>>(capacity);
    }

    public hashFunction(key: K): number {
        let raw: number;
        if (typeof key === 'number') {
            raw = Math.abs(Number(key) || 0);
        } else {
            const s = String(key);
            raw = 0;
            for (let i = 0; i < s.length; i++) {
                raw = (raw * 31 + s.charCodeAt(i)) | 0;
            }
            raw = Math.abs(raw);
        }
        return raw % this.Capacity;
    }

    /*
        Algorithm:
         put(key, value)
        - Compute the index = hashFunction(key)
        - Get the bucket at index = Buckets[index]
        - if bucket is null
           * create new bucket and insert at that index 
           * otherwise iterate through
              if there is duplicate key
                - replace that the old entry with new entry 
               just push the new entry to the bucket: bucket.entries.push(new Entry(key, value))
    */
    public put(key: K, value: V): void {
        const index = this.hashFunction(key);
        let bucket = this.Buckets[index];
        if (!bucket) {
            bucket = new Bucket<K, V>();
            this.Buckets[index] = bucket;
            bucket.entries.push(new Entry(key, value));
            this._size++;
            return;
        }

        for (let entry of bucket.entries) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }
        bucket.entries.push(new Entry(key, value));
        this._size++;
        return;
    }

    /*
        /*
        Algorithm:
         get(key, value)
        - Compute the index = hashFunction(key)
        - Get the bucket at index = Buckets[index]
        - if no bucket: bucket.entries.length === 0
           * return null 
           * otherwise iterate through
              if there is key matching
                * return that entry.value
            return null
    */
    public get(key: K): V | null {
        const index = this.hashFunction(key);
        const bucket = this.Buckets[index];

        if (!bucket || bucket.entries.length === 0) {
            return null;
        }

        for (let entry of bucket.entries) {
            if (entry.key === key) {
                return entry.value;
            }
        }
        return null;
    }

    public remove(key: K): boolean {
        const index = this.hashFunction(key);
        const bucket = this.Buckets[index];
        if (!bucket || bucket.entries.length === 0) return false;
        for (let i = 0; i < bucket.entries.length; i++) {
            if (bucket.entries[i].key === key) {
                bucket.entries.splice(i, 1);
                this._size = Math.max(0, this._size - 1);
                return true;
            }
        }
        return false;
    }

    public getSize(): number {
        return this._size;
    }

}

/*
    Feature reasoning
    
    Contract: 
    Objective
    Implement a Least Recently Used (LRU) Cache to store API responses.
    The cache should remove the least recently accessed data when full.
        1. put(key: string, value: string): void
    2. get(key: string): string | null
    Retrieves the value associated with a given key.
    If the key is not found, return null .
    Marks the accessed key as most recently used.
   3. size(): number 
    Returns the current number of items in the cache.

Constraints
Must use a Doubly Linked List and HashMap for efficient cache management.
No built-in Map, Set, or caching libraries allowed.
3. size(): number

    Defining the feature concept: (What makes this feature the feature?)
        //What LRU cache?

        - Least Recently Used Cache, meaning that the node that has been not been looked up, the node will be sad and be removed. Though capacity dependent.
        
        - Invariants of the LRU Cache list(this guy owns the doubly linked list and the map)
            - Most recently used node will be at the head.
            - Least recent used will be at the tail.
            - Map is dumb, it just has a key with a value that refers to the real node list structure.

        High level operations:
        - get (key): V | null returns  value or null
        - put (key, value): void inserts or updates the value
        - putToHead (node): void put a the most recent node first
        - removeNodeTail(): void removes the least recent node
        - moveToHead(node): void moves a node to head
        - size(): number returns current size
        - capacity(): number returns max capacity
        
    Design:
        Due to constraint of this exercise. We will use
        - Doubly linked list to make the ordered list (For fast removal and insertion)
        - A HashMap build from scratch for a fast look up 
        - The values of the hashmap will be references to a linked list node.o(1) look up time.
        - The LruCache class is the composition of both DS, it owns the stuff. It will provide the sufficient operation to manipulate both DS and achieve the LRU contract.
        
        - The head, Mru = this.head
        - The tail, Lru = this.tail 
        - Eviction: size > capacity => .removeTail()

    

    
*/
export class LRUCache<K, V> {
    private capacity: number = 0;
    private size: number = 0;
    private map: HashMap<K, Node<K, V>> = new HashMap<K, Node<K, V>>();
    private head: Node<K, V> | null = null;
    private tail: Node<K, V> | null = null;

    constructor(capacity: number) {
        this.capacity = capacity;
    }
    // Add node to the head (most recently used)
    private addNode(node: Node<K, V>): void {
        node.prev = null;
        node.next = this.head;
        if (this.head) this.head.prev = node;
        this.head = node;
        if (!this.tail) this.tail = node;
        this.size++;
    }

    // Remove a node from the list
    private removeNode(node: Node<K, V>): void {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;

        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;

        node.prev = null;
        node.next = null;
        this.size--;
    }

    // Move an existing node to head (MRU)
    private moveToHead(node: Node<K, V>): void {
        if (this.head === node) return;
        this.removeNode(node);
        this.addNode(node);
    }

    // Remove tail (LRU) and return it
    private removeTail(): Node<K, V> | null {
        if (!this.tail) return null;
        const oldTail = this.tail;
        this.removeNode(oldTail);
        return oldTail;
    }

    // Public API: get value and mark as recently used
    public get(key: K): V | null {
        const node = this.map.get(key);
        if (!node) return null;
        this.moveToHead(node);
        return node.value as V;
    }

    // Public API: put key/value — inserts or updates and enforces capacity
    public put(key: K, value: V): void {
        const existing = this.map.get(key);
        if (existing) {
            existing.value = value;
            this.moveToHead(existing);
            this.map.put(key, existing);
            return;
        }

        const node = new Node<K, V>(key, value);
        this.addNode(node);
        this.map.put(key, node);

        if (this.size > this.capacity) {
            const tail = this.removeTail();
            if (tail && tail.key !== null) {
                // remove from hashmap
                (this.map as any).remove(tail.key as K);
            }
        }
    }

    // Return current number of items in cache
    public getSize(): number {
        return this.size;
    }

    // Debug / UI helpers: return keys from head (MRU) -> tail (LRU)
    public keys(): K[] {
        const out: K[] = [];
        let cur = this.head;
        while (cur) {
            if (cur.key !== null) out.push(cur.key);
            cur = cur.next;
        }
        return out;
    }

    // Return entries as {key, value} from head -> tail for UI display
    public entries(): Array<{ key: K; value: V }> {
        const out: Array<{ key: K; value: V }> = [];
        let cur = this.head;
        while (cur) {
            if (cur.key !== null) out.push({ key: cur.key, value: cur.value as V });
            cur = cur.next;
        }
        return out;
    }
}