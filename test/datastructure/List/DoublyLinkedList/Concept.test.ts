import { DoublyLinkedList, Node } from '../../../../src/datastructure/List/DoublyLinkedList/Concept';

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

// New tests: insertAfter and removeAfter
describe('DoublyLinkedList insertAfter and removeAfter', () => {
    let list: DoublyLinkedList;

    beforeEach(() => {
        list = new DoublyLinkedList();
    });

    test('insertAfter on empty list returns null', () => {
        const node = new Node('A');
        const result = list.insertAfter(node, 'B');
        expect(result).toBeNull();
    });

    test('insertAfter inserts after tail and updates tail', () => {
        list.addLast('A');
        const tailNode = list.tail!;
        const newNode = list.insertAfter(tailNode, 'B');

        expect(newNode?.data).toBe('B');
        expect(list.tail?.data).toBe('B');
        expect(list.tail?.prev?.data).toBe('A');
        expect(list.tail?.next).toBeNull();
        expect(tailNode.next?.data).toBe('B');
    });

    test('insertAfter inserts in middle correctly', () => {
        list.addLast('A');
        list.addLast('C');
        const headNode = list.head!;

        const newNode = list.insertAfter(headNode, 'B');

        expect(newNode?.data).toBe('B');
        expect(list.head?.next?.data).toBe('B');
        expect(list.tail?.prev?.data).toBe('B');
        expect(newNode?.prev?.data).toBe('A');
        expect(newNode?.next?.data).toBe('C');
    });

    test('insertAfter returns null if node not found', () => {
        list.addLast('A');
        const foreignNode = new Node('X');
        const result = list.insertAfter(foreignNode, 'B');
        expect(result).toBeNull();
    });

    test('removeAfter on empty list does nothing', () => {
        const node = new Node('A');
        list.removeAfter(node);
        expect(list.head).toBeNull();
    });

    test('removeAfter tail does nothing', () => {
        list.addLast('A');
        const tailNode = list.tail!;
        list.removeAfter(tailNode);
        expect(list.tail?.data).toBe('A');
        expect(list.tail?.next).toBeNull();
    });

    test('removeAfter removes middle node correctly', () => {
        list.addLast('A');
        list.addLast('B');
        list.addLast('C');
        const headNode = list.head!; // A

        // Remove B (which is after A)
        list.removeAfter(headNode);

        expect(list.head?.next?.data).toBe('C');
        expect(list.tail?.prev?.data).toBe('A');
    });

    test('removeAfter removes tail node correctly (when removing after node-before-tail)', () => {
        list.addLast('A');
        list.addLast('B');
        const headNode = list.head!; // A

        // Remove B (which is tail)
        list.removeAfter(headNode);

        expect(list.tail?.data).toBe('A');
        expect(list.tail?.next).toBeNull();
    });
});
