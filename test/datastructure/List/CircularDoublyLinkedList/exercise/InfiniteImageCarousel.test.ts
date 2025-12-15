import { InfiniteImageCarousel } from "../../../../../src/datastructure/List/CircularDoublyLinkedList/exercise/InfiniteImageCarousel";
import { CircularDoublyLinkedList } from "../../../../../src/datastructure/List/CircularDoublyLinkedList/Concept";

function getInternalList(carousel: InfiniteImageCarousel): CircularDoublyLinkedList<string> {
    return (carousel as unknown as { imageList: CircularDoublyLinkedList<string> }).imageList;
}

describe("InfiniteImageCarousel", () => {
    test("next/prev on empty list does not crash and stays empty", () => {
        const carousel = new InfiniteImageCarousel();
        const list = getInternalList(carousel);

        expect(list.IsEmpty).toBe(true);
        expect(list.getCurrent()).toBeNull();

        carousel.nextImage();
        expect(list.getCurrent()).toBeNull();
        expect(list.IsEmpty).toBe(true);

        carousel.prevImage();
        expect(list.getCurrent()).toBeNull();
        expect(list.IsEmpty).toBe(true);
    });

    test("addImage sets current to the new image", () => {
        const carousel = new InfiniteImageCarousel();
        const list = getInternalList(carousel);

        carousel.addImage("img-1");
        expect(list.getCurrent()).toBe("img-1");
        expect(list.Size).toBe(1);
    });

    test("next/prev wrap around infinitely", () => {
        const carousel = new InfiniteImageCarousel();
        const list = getInternalList(carousel);

        carousel.addImage("img-1");
        carousel.addImage("img-2");
        carousel.addImage("img-3");

        expect(list.Size).toBe(3);
        expect(list.getCurrent()).toBe("img-3");

        carousel.nextImage();
        expect(list.getCurrent()).toBe("img-1");

        carousel.nextImage();
        expect(list.getCurrent()).toBe("img-2");

        carousel.prevImage();
        expect(list.getCurrent()).toBe("img-1");

        carousel.prevImage();
        expect(list.getCurrent()).toBe("img-3");
    });
});

