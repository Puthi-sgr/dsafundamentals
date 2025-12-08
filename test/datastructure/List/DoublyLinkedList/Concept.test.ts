import { DoublyLinkedList } from '../../../../src/datastructure/List/DoublyLinkedList/Concept';

describe('DoublyLinkedList addLast', () => {
    let list: DoublyLinkedList;

    beforeEach(() => {
        list = new DoublyLinkedList();
    });

    test('adds to empty list', () => {
        list.addLast('A');
        expect(list.head?.data).toBe('A');
        expect(list.tail?.data).toBe('A');
        expect(list.head?.prev).toBeNull();
        expect(list.tail?.next).toBeNull();
    });

    test('adds to non-empty list', () => {
        list.addLast('A');
        list.addLast('B');
        expect(list.head?.data).toBe('A');
        expect(list.tail?.data).toBe('B');
        expect(list.head?.next?.data).toBe('B');
        expect(list.tail?.prev?.data).toBe('A');
        expect(list.head?.prev).toBeNull();
        expect(list.tail?.next).toBeNull();
    });

    test('maintains invariants after multiple adds', () => {
        list.addLast('A');
        list.addLast('B');
        list.addLast('C');
        expect(list.head?.prev).toBeNull();
        expect(list.tail?.next).toBeNull();
        expect(list.head?.data).toBe('A');
        expect(list.tail?.data).toBe('C');
    });

    test('printForward outputs list to console (no assertions)', () => {
        // This test intentionally does not assert anything.
        // It calls printForward so you can inspect the console output when running tests.
        list.addLast('X');
        list.addLast('Y');
        list.addLast('Z');
        list.printForward();
        list.printBackward();
    });
});

// New tests: addFirst and removeLast
describe('DoublyLinkedList addFirst and removeLast', () => {
    let list: DoublyLinkedList;

    beforeEach(() => {
        list = new DoublyLinkedList();
    });

    test('addFirst on empty list sets head and tail', () => {
        list.addFist('H'); // note: method name in source is addFist
        expect(list.head?.data).toBe('H');
        expect(list.tail?.data).toBe('H');
        expect(list.head?.prev).toBeNull();
        expect(list.tail?.next).toBeNull();
    });

    test('addFirst on non-empty rewires head correctly', () => {
        list.addLast('A');
        list.addFist('B');
        expect(list.head?.data).toBe('B');
        expect(list.head?.next?.data).toBe('A');
        expect(list.tail?.data).toBe('A');
        expect(list.tail?.prev?.data).toBe('B');
        expect(list.head?.prev).toBeNull();
        expect(list.tail?.next).toBeNull();
    });

    test('removeLast on empty list returns null and keeps list empty', () => {
        const removed = list.removeLast();
        expect(removed).toBeNull();
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('removeLast on one-element list removes and clears head/tail', () => {
        list.addLast('Solo');
        const removed = list.removeLast();
        expect(removed).toBe('Solo');
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('removeLast on multi-element list disconnects old tail and updates tail', () => {
        list.addLast('A');
        list.addLast('B');
        list.addLast('C');
        const removed = list.removeLast();
        expect(removed).toBe('C');
        expect(list.tail?.data).toBe('B');
        expect(list.tail?.next).toBeNull();
        expect(list.head?.prev).toBeNull();
        // ensure the removed node is not reachable from tail/head chain
        // optional: traverse forward to ensure sequence A -> B
        const forward: string[] = [];
        let node = list.head;
        while (node) {
            forward.push(node.data);
            node = node.next;
        }
        expect(forward).toEqual(['A', 'B']);
    });
});