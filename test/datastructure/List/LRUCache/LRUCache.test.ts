import { LRUCache } from '../../../../src/datastructure/List/LRUCache/LRUCache';

describe('LRUCache', () => {
    test('put/get and eviction (LRU)', () => {
        const cache = new LRUCache<string, number>(2);
        cache.put('a', 1);
        cache.put('b', 2);
        expect(cache.getSize()).toBe(2);

        // access 'a' so 'b' becomes LRU
        expect(cache.get('a')).toBe(1);

        // inserting 'c' should evict 'b'
        cache.put('c', 3);
        expect(cache.get('b')).toBeNull();
        expect(cache.get('a')).toBe(1);
        expect(cache.get('c')).toBe(3);
    });

    test('accessing existing key makes it MRU (prevents its eviction)', () => {
        const cache = new LRUCache<string, number>(2);
        cache.put('a', 1);
        cache.put('b', 2);

        // access 'a' so it becomes MRU
        expect(cache.get('a')).toBe(1);

        // adding 'c' should evict 'b'
        cache.put('c', 3);
        expect(cache.get('b')).toBeNull();
        expect(cache.get('a')).toBe(1);
        expect(cache.get('c')).toBe(3);
    });

    test('updating existing key changes value and keeps size', () => {
        const cache = new LRUCache<string, number>(2);
        cache.put('a', 1);
        cache.put('b', 2);
        expect(cache.getSize()).toBe(2);

        // update 'a'
        cache.put('a', 42);
        expect(cache.getSize()).toBe(2);
        expect(cache.get('a')).toBe(42);
    });
});
