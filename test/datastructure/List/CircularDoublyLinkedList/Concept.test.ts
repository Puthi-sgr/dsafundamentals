import { CircularDoublyLinkedList } from "../../../../src/datastructure/List/CircularDoublyLinkedList/Concept";

describe("CircularDoublyLinkedList insertAfterCurrent", () => {
    test("inserting into empty list creates a self-stitched node", () => {
        const list = new CircularDoublyLinkedList<string>();
        expect(list.current).toBeNull();
        expect(list.size).toBe(0);

        list.insertAfterCurrent("A");

        expect(list.size).toBe(1);
        expect(list.current?.data).toBe("A");
        expect(list.current?.next).toBe(list.current);
        expect(list.current?.prev).toBe(list.current);
    });

    test("inserting into non-empty list stitches node after current", () => {
        const list = new CircularDoublyLinkedList<string>();

        list.insertAfterCurrent("A"); // current = A
        list.insertAfterCurrent("B"); // insert after A

        const a = list.current!;
        const b = a.next!;

        expect(list.size).toBe(2);
        expect(a.data).toBe("A");
        expect(b.data).toBe("B");

        // circular invariants
        expect(a.prev).toBe(b);
        expect(a.next).toBe(b);
        expect(b.prev).toBe(a);
        expect(b.next).toBe(a);
    });

    test("multiple inserts maintain circular linkage and size", () => {
        const list = new CircularDoublyLinkedList<string>();

        list.insertAfterCurrent("A"); // A
        list.insertAfterCurrent("B"); // A <-> B (circular)
        list.insertAfterCurrent("C"); // A -> C -> B -> A (since current is A)

        const a = list.current!;
        const c = a.next!;
        const b = c.next!;

        expect(list.size).toBe(3);
        expect([a.data, c.data, b.data]).toEqual(["A", "C", "B"]);

        // forward cycle
        expect(b.next).toBe(a);
        // backward cycle
        expect(a.prev).toBe(b);

        // local linkage checks
        expect(a.next).toBe(c);
        expect(c.prev).toBe(a);
        expect(c.next).toBe(b);
        expect(b.prev).toBe(c);
    });
});
