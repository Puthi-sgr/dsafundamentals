import { HashMap } from '../../../../src/datastructure/List/LRUCache/LRUCache';

describe('HashMap (basic semantics)', () => {
    test('put + get returns stored value', () => {
        const map = new HashMap<string, number>();
        (map as any).put('a', 1);
        expect((map as any).get('a')).toBe(1);
    });

    test('put with duplicate key replaces value', () => {
        const map = new HashMap<string, number>();
        (map as any).put('a', 1);
        (map as any).put('a', 2);
        expect((map as any).get('a')).toBe(2);
        expect((map as any).getSize()).toBe(1);
    });

    test('get on non-existing key returns null', () => {
        const map = new HashMap<string, number>();
        expect((map as any).get('missing')).toBeNull();
    });

    test('size reflects the number of entries', () => {
        const map = new HashMap<string, number>();
        expect((map as any).getSize()).toBe(0);
        (map as any).put('a', 1);
        (map as any).put('b', 2);
        expect((map as any).getSize()).toBe(2);
        (map as any).put('b', 3); // update should not increment size
        expect((map as any).getSize()).toBe(2);
    });
});
