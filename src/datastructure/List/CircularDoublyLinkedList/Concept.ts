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

/*
    But why circular linked list?
    - It is made to solve a kind of problem that involves rotations, infinite wrap around, and a never ending list(Not infinite size). 
    
    * Why not array?
        - Problem at insertions and deletions at arbitrary position -> array shift stuff -> More expensive -> o(n) ops

    * If a problem requires fast insert and deletion linked list is the choice.ion
        But why?
          - By nature, a linked list node only needs to rewire neighboring nodes pointer to do insert and delete, massive shifting behavior. -> O(1) ops
*/

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

    //  moveForward
    /*
        contract:
            input: void
            output: the node data

        design:
            - simply move current to next
            - case of 1 element: the algo should bring back to itself
            - No list just give back null

        algorithm:
            if(current == null) return null;
            current = current.next
            return current.data

    */
    moveForward(): T | null {
        if (this.current == null) return null;
        this.current = this.current.next!;
        return this.current.data;
    }

    // moveBackward
    /*
        Basically the same as move forward but move to prev instead
    */
    moveBackward(): T | null {
        if (this.current == null) return null;
        this.current = this.current.prev!;
        return this.current.data;
    }

    //getCurrent
    /*
        contract:
            input: void
            output: current data
        
        design:
            - no list just return null
            - have list return current data

        algorithm:
            if(current == null) return null
            return current.data
    */
    getCurrent(): T | null {
        if (this.current == null) return null;
        return this.current.data;
    }

    get Size(): number {
        return this.size;
    }

    get IsEmpty(): boolean {
        if (this.size == 0 && this.current == null) return true;
        return false;
    }
}