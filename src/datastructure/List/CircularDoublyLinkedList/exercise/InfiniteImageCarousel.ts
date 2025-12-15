/*
 Feature level reasoning:
    Feature contract:
        - Move forward and backward behavior should not crash even on empty list
        - Empty list cases gray out the next and prev button
        - Move forward shall loop back if at tail.
        - User sees the current image

    concept:
        What is an image carousel?
        - A carousel is rotating ring
            => basically rotating ring of image
        - The circular doubly linked list represents the ring, it is the carousel.
        - Each node is an image connected by next and prev pointers
        - The current should model the current user view, the image that the user is seeing right now

        ?Why circular linked list here?
        - Conceptually a carousel is a ring(1), its rotating(2), and the requirement wants infinite scrolling(3)

    Design: 
        - Assuming that order of image is not important, the image will be add at the current position => Image list only needs current.
*/

import { CircularDoublyLinkedList } from "../Concept";

export class InfiniteImageCarousel {
    private imageList: CircularDoublyLinkedList<string> = new CircularDoublyLinkedList<string>(); //Owns the circular doubly linked list structure

    //addImage
    /*
        contract:
            - input: image url
            - output: void
        
        design:
            - insert after
            - move current image to new node
        
        algorithm:
            imageList.insertAfterCurrent(url)
            move current to the new node
            show the current image

     */
    addImage(url: string): void {
        this.imageList.insertAfterCurrent(url);
        // Move current to the newly inserted node (the node after current)
        this.imageList.moveForward();
    }

    //nextImage
    /*
        contract:
            - input: void
            - output: void
        
        design:
            - move current to next and show current image
            - empty list do nothing
        
        algorithm:
            - call the move  next
           
     */

    nextImage(): void {
        this.imageList.moveForward();
    }

    //prevImage same stuff

    prevImage(): void {
        this.imageList.moveBackward();
    }

    //getCurrentImage
    getCurrentImage(): string | null {
        return this.imageList.getCurrent();
    }

    getSize(): number {
        return this.imageList.Size;
    }

    isEmpty(): boolean {
        return this.imageList.IsEmpty;
    }
}
