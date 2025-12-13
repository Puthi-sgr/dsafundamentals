//Invariant of doubly link list
//The head.prev and the tail.next MUST BE INITIALIZED TO NULL
//Foundational structure of a doubly linked list

//We can think of node is like a car on a railway. Its dumb, it knows nothing about the bigger picture
export class Node<T> {
    data: T;
    prev: Node<T> | null = null;
    next: Node<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }
}

//As soon as we instantiate Node it will look something like this:

// new Node("5")
// null <-|prev|5|next|-> null


//For the big, the one who owns the list
//All it cares about is where the head and tail are and provide operations to manipulate the dumb nodes.
export class DoublyLinkedList<T> {
    //Invariant: head.prev MUST ALWAYS BE NULL
    //Invariant: tail.next MUST ALWAYS BE NULL
    //If any logic ends with these criteria being violated. The Logic is BROKEN

    head: Node<T> | null = null;
    tail: Node<T> | null = null;

    //The reason that it is void because it needs to follow the principle of hiding the structure of the list it self. Remember the invariant of this class is only to manage the chained nodes not exposing the structure


    /* 
        - if (list = null) 
            head = node
            tail = head, why ? invariant head=tail cuz only one element
            *prev & next points to null by default

        - if (list)
            tailnext to new
            newprev to tail
            tail moves to new tail = new
    */
    addLast(data: T): void {
        var newNode = new Node(data);

        //Empty list
        if (this.head === null && this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail != null) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        return;
    }

    /*
        2 potential cases we need to consider
        1. empty list
        2. have list(only care if it has head or not)
        
        - Empty list
            if(head and tail is empty) head and tail points to the newNode
        
        - have list
            if(head is not null) 
                head.prev points to new node
                newNode.next points head
                head move to new node
    */
    addFist(data: T): void {
        let newNode = new Node(data);

        if (this.head === null && this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head!.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    /*
        3 Potential cases we need to consider
        1. empty list
        2. One element list
        3. Multi element list

        - Empty list
            if(head == null && tail == null) return null
        
        - One element list
            if(head == tail)
                head = tail = null
        
        - Multi element list
            if(tail.prev not null)
                tail move back one node
                tail.next = null
    */
    removeLast(): T | null {

        if (this.head === null && this.tail === null) {
            return null;
        }

        let toBeRemoveData = this.tail!.data;

        if (this.head == this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            let newTail = this.tail!.prev;

            //Detaches the remove node
            this.tail!.prev = null;
            this.tail!.next = null;

            //Detach the new tail from the removed node
            newTail!.next = null;
            this.tail = newTail;
        }

        return toBeRemoveData;
    }

    /*
        3 Potential cases
            1. No list
            2. No node found
            4. Insert at tail
            3. Normal
        
        - Empty list
        if(head == null && tail == null) return null
        
        - No node found
            if(reaches the end of the list and no matching node ) return null
        
        -At tail. How do we know if we are at tail?
        if(node == tail)
        - newnode.next -> null
        - newnode.prev -> tail
        - tail.next -> newNode
        
        - curr == matching node
        - newnode.next -> curr.next
        - newnode.prev -> curr
        - curr.next.prev -> newNode
        - curr.next>newNode

        
    */
    insertAfter(node: Node<T>, value: T): Node<T> | null {

        if (this.head === null && this.tail === null) {
            return null;
        }


        if (this.tail == node) {
            let newNode = new Node(value);
            newNode.next = null;
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            return newNode;
        }

        let current = this.head;
        while (current) {

            if (current == node) {
                let newNode = new Node(value);
                newNode.next = current.next;
                newNode.prev = current;
                current.next!.prev = newNode;
                current.next = newNode;
                return newNode; //Return in this block to avoid moving current forward
            }
            current = current.next;
        }
        return null; //No node found
    }



    /*
        5 Potential cases
            1. No list
            2. No node found
            3. No node to be cut off after that node(tail occurrence)
            4. Cut off at middle 
            5. Cut off at tail
        
        - Empty list
        if(head == null && tail == null) return null
        
        - No node found
            if(reaches the end of the list and no matching node ) return null
        
        - Matching tail node but no node to be cut off
            if(node == tail) return null

        - Matching middle node
            if(node == curr)
                - toBeRemove = curr.next
                - curr.next = toBeRemove.next
                - tobeRemove.next.prev = curr
                - Detach toBeRemove
        
        - A cut off at tail node. How do we know the next node is a tail
            if(node == curr && curr.next == tail)
                - toBeRemove = tail
                - curr.next = null
                - tobeRemove.prev = null
                - tail =curr
                
    */

    removeAfter(node: Node<T>): void {

        if (this.head === null && this.tail === null) {
            return;

        }

        if (this.tail == node) {
            return;
        }

        let current = this.head;

        while (current) {
            if (current == node && current.next != null) {
                let toBeRemove = current.next;
                current.next = toBeRemove.next;

                if (toBeRemove.next != null) {
                    toBeRemove.next!.prev = current;
                    //Detach toBeRemove
                    toBeRemove.next = null;
                    toBeRemove.prev = null;
                } else {
                    current.next = null;

                    toBeRemove!.prev = null;
                    this.tail = current;
                }



                return;
            }

            current = current.next;
        }

        return; //No node found
    }


    printForward(): void {
        let node = this.head;
        const dataList: T[] = [];

        while (node) {
            dataList.push(node.data);
            node = node.next;
        }

        console.log(dataList.join(' -> '));
    }

    printBackward(): void {
        let node = this.tail;
        const dataList: T[] = [];

        while (node) {
            dataList.push(node.data);
            node = node.prev;
        }

        console.log(dataList.join(' <- '));
    }
}


//The SoC of these two classes are
//Nodes = dumb
//DoubleLinkedList = smart, allow you to poke around the nodes

//How about current? Current models the user current state, position. But how? The current use the operations provided by the DoubledLinkList class to move around the list.

