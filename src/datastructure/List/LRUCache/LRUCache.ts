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
        
    Design:
        Due to constraint of this exercise. We will use
        - Doubly linked list to make the ordered list (For fast removal and insertion)
        - A HashMap build from scratch for a fast look up 
        - The values of the hashmap will be references to a linked list node.o(1) look up time.
        - The LruCache class is the composition of both DS, it owns the stuff. It will provide the sufficient operation to manipulate both DS and achieve the LRU contract.
        
        - The head, Mru = this.head
        - The tail, Lru = this.tail 
        - Eviction: size > capacity => .removeTail()

    
    High level operations:
        - get (key): V | null returns  value or null
        - put (key, value): void inserts or updates the value
        - size(): number returns current size
        - capacity(): number returns max capacity
    
*/

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
 *  - remove(key): void 
 *   - size(): number

 */

export class LRUCache<K, V> {
    private capacity: number = 0;
    private size: number = 0;
    private map: Map<K, Node<K, V>> = new Map();
    private head: Node<K, V> | null = null;
    private tail: Node<K, V> | null = null;

    constructor(capacity: number) {
        this.capacity = capacity;
    }
}