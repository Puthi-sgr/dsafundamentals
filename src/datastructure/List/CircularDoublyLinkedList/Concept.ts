// CircularDoublyLinkedList Node Definition

export class Node<T> {
    data: T;
    prev: Node<T> | null = null;
    next: Node<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }
}

//Circular doubly linked list should not have tail or head because any node can be a head or tail. So the only valid reference is the current node;

//The invariant of a circular doubly list are 
/*
    + Empty list 
        if current == null

    + Non-empty list if(current != null)
        - single node
            if current.next == current and current.prev == current
        - multi node
            if current.next != current and current.prev != current
*/

export class CircularDoublyLinkedList<T> {
    current: Node<T> | null = null;
    size: number = 0;

    //Insert after current
    /*
        contract:
            - input: data to be inserted
            - output: void
            
        
        design:
            - grab the current and insert after it
            - rewire the pointers
            - No list -> create new and stitch to itself
            - have list -> insert after current and rewire pointers

        algorithm:
            if(Current == null)
                create new node
                stitch next and prev to itself how?
                current.next = current
                current.prev = current
                size++
            else
                create new node
                newnode.next = current.next
                newnode.prev = current
                //Stitching mechanism
                current.next.prev = newnode
                current.next = newnode 
                size++
        return
    */

        //How do you run a specif test file in jest?
        //npx jest <path-to-test-file>
        
        
    insertAfterCurrent(value: T): void {

        if (this.current == null) {
            let newNode = new Node(value);
            this.current = newNode;
            //its stitched to itself
            this.current.next = newNode
            this.current.prev = newNode
            this.size++;
            return;
        } else {
            let newNode = new Node(value);
            newNode.next = this.current.next;
            newNode.prev = this.current;
            //Stitching mechanism
            this.current.next!.prev = newNode;
            this.current.next = newNode;
            this.size++;
            return;
        }
    }

}