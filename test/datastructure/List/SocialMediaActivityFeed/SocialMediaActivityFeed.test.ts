import { SocialMediaActivityFeed } from "../../../../src/datastructure/List/SocialMediaActivityFeed/SocialMediaActivityFeed";

describe("SocialMediaActivityFeed", () => {
    test("starts empty", () => {
        const feed = new SocialMediaActivityFeed();
        expect(feed.getSize()).toBe(0);
        expect(feed.showActivities()).toEqual([]);
        expect(feed.getCurrent()).toBeNull();
        expect(feed.next()).toBeNull();
        expect(feed.prev()).toBeNull();
    });

    test("addActivity ignores empty/whitespace input", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("");
        feed.addActivity("   ");
        expect(feed.getSize()).toBe(0);
        expect(feed.showActivities()).toEqual([]);
    });

    test("addActivity maintains recency order (most recent first)", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("Liked a post");
        feed.addActivity("Commented on a post");
        feed.addActivity("Followed someone");

        expect(feed.getSize()).toBe(3);
        expect(feed.showActivities()).toEqual([
            "Followed someone",
            "Commented on a post",
            "Liked a post",
        ]);
    });

    test("deleteActivity ignores invalid indices", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("A");
        feed.addActivity("B");

        feed.deleteActivity(-1);
        feed.deleteActivity(2);
        feed.deleteActivity(999);

        expect(feed.getSize()).toBe(2);
        expect(feed.showActivities()).toEqual(["B", "A"]);
    });

    test("deleteActivity removes head (most recent), middle, and tail correctly", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("A"); // oldest
        feed.addActivity("B");
        feed.addActivity("C"); // most recent
        feed.addActivity("D"); // most recent

        // List is: D, C, B, A
        feed.deleteActivity(0); // remove head (D)
        expect(feed.showActivities()).toEqual(["C", "B", "A"]);
        expect(feed.getSize()).toBe(3);

        feed.deleteActivity(1); // remove middle (B)
        expect(feed.showActivities()).toEqual(["C", "A"]);
        expect(feed.getSize()).toBe(2);

        feed.deleteActivity(1); // remove tail (A)
        expect(feed.showActivities()).toEqual(["C"]);
        expect(feed.getSize()).toBe(1);

        feed.deleteActivity(0); // remove last remaining
        expect(feed.showActivities()).toEqual([]);
        expect(feed.getSize()).toBe(0);
    });

    test("navigation: resetToHead + next/prev traverses without moving past ends", () => {
        const feed = new SocialMediaActivityFeed();
        feed.addActivity("A");
        feed.addActivity("B");
        feed.addActivity("C");
        // showActivities: C, B, A

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
    });
});

