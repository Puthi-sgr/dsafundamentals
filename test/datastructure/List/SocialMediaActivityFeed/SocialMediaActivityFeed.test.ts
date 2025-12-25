import { SocialMediaActivityFeed } from "../../../../src/datastructure/List/SocialMediaActivityFeed/SocialMediaActivityFeed";

type InternalNode = {
    data: string;
    next: InternalNode | null;
    prev: InternalNode | null;
};

function getHead(feed: SocialMediaActivityFeed): InternalNode | null {
    return (feed as unknown as { head: InternalNode | null }).head;
}

function getTail(feed: SocialMediaActivityFeed): InternalNode | null {
    return (feed as unknown as { tail: InternalNode | null }).tail;
}

function assertInvariants(feed: SocialMediaActivityFeed) {
    const size = feed.getSize();
    const head = getHead(feed);
    const tail = getTail(feed);

    if (size === 0) {
        expect(head).toBeNull();
        expect(tail).toBeNull();
        expect(feed.showActivities()).toEqual([]);
        return;
    }

    expect(head).not.toBeNull();
    expect(tail).not.toBeNull();
    expect(head!.prev).toBeNull();
    expect(tail!.next).toBeNull();

    const forwardNodes: InternalNode[] = [];
    let current = head;
    let steps = 0;
    while (current) {
        forwardNodes.push(current);
        if (current.next) {
            expect(current.next.prev).toBe(current);
        }
        current = current.next;
        steps++;
        expect(steps).toBeLessThanOrEqual(size + 1); // prevents accidental cycles
    }

    expect(forwardNodes.length).toBe(size);
    expect(forwardNodes[0]).toBe(head);
    expect(forwardNodes[forwardNodes.length - 1]).toBe(tail);

    const backwardNodes: InternalNode[] = [];
    current = tail;
    steps = 0;
    while (current) {
        backwardNodes.push(current);
        if (current.prev) {
            expect(current.prev.next).toBe(current);
        }
        current = current.prev;
        steps++;
        expect(steps).toBeLessThanOrEqual(size + 1);
    }

    expect(backwardNodes.length).toBe(size);
    expect(backwardNodes[0]).toBe(tail);
    expect(backwardNodes[backwardNodes.length - 1]).toBe(head);

    expect(feed.showActivities()).toEqual(forwardNodes.map((n) => n.data));
}

describe("SocialMediaActivityFeed", () => {
    test("starts empty", () => {
        const feed = new SocialMediaActivityFeed();
        expect(feed.getSize()).toBe(0);
        expect(feed.showActivities()).toEqual([]);
        expect(feed.getCurrent()).toBeNull();
        expect(feed.next()).toBeNull();
        expect(feed.prev()).toBeNull();
        assertInvariants(feed);
    });

    test("addActivity ignores empty/whitespace input", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("");
        feed.addActivity("   ");
        expect(feed.getSize()).toBe(0);
        expect(feed.showActivities()).toEqual([]);
        assertInvariants(feed);
    });

    test("addActivity maintains recency order (most recent first)", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("Liked a post");
        assertInvariants(feed);
        feed.addActivity("Commented on a post");
        assertInvariants(feed);
        feed.addActivity("Followed someone");

        expect(feed.getSize()).toBe(3);
        expect(feed.showActivities()).toEqual([
            "Followed someone",
            "Commented on a post",
            "Liked a post",
        ]);
        assertInvariants(feed);
    });

    test("deleteActivity ignores invalid indices", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("A");
        feed.addActivity("B");
        assertInvariants(feed);

        feed.deleteActivity(-1);
        feed.deleteActivity(2);
        feed.deleteActivity(999);

        expect(feed.getSize()).toBe(2);
        expect(feed.showActivities()).toEqual(["B", "A"]);
        assertInvariants(feed);
    });

    test("deleteActivity removes head (most recent), middle, and tail correctly", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("A"); // oldest
        feed.addActivity("B");
        feed.addActivity("C"); // most recent
        feed.addActivity("D"); // most recent
        assertInvariants(feed);

        // List is: D, C, B, A
        feed.deleteActivity(0); // remove head (D)
        expect(feed.showActivities()).toEqual(["C", "B", "A"]);
        expect(feed.getSize()).toBe(3);
        assertInvariants(feed);

        feed.deleteActivity(1); // remove middle (B)
        expect(feed.showActivities()).toEqual(["C", "A"]);
        expect(feed.getSize()).toBe(2);
        assertInvariants(feed);

        feed.deleteActivity(1); // remove tail (A)
        expect(feed.showActivities()).toEqual(["C"]);
        expect(feed.getSize()).toBe(1);
        assertInvariants(feed);

        feed.deleteActivity(0); // remove last remaining
        expect(feed.showActivities()).toEqual([]);
        expect(feed.getSize()).toBe(0);
        assertInvariants(feed);
    });

    test("navigation: resetToHead + next/prev traverses without moving past ends", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("A");
        feed.addActivity("B");
        feed.addActivity("C");
        // showActivities: C, B, A
        assertInvariants(feed);

        feed.resetToHead();
        expect(feed.getCurrent()).toBe("C");

        expect(feed.next()).toBe("B");
        expect(feed.getCurrent()).toBe("B");

        expect(feed.next()).toBe("A");
        expect(feed.getCurrent()).toBe("A");

        // at tail
        expect(feed.next()).toBeNull();
        expect(feed.getCurrent()).toBe("A");

        expect(feed.prev()).toBe("B");
        expect(feed.getCurrent()).toBe("B");

        expect(feed.prev()).toBe("C");
        expect(feed.getCurrent()).toBe("C");

        // at head
        expect(feed.prev()).toBeNull();
        expect(feed.getCurrent()).toBe("C");
        assertInvariants(feed);
    });

    test("deleting the last activity clears current activity", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("Only");
        feed.resetToHead();
        expect(feed.getCurrent()).toBe("Only");

        feed.deleteActivity(0);

        expect(feed.getSize()).toBe(0);
        expect(feed.showActivities()).toEqual([]);
        expect(feed.getCurrent()).toBeNull();
        assertInvariants(feed);
    });
});
