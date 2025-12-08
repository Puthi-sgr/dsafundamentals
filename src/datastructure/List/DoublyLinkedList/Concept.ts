//Invariant of doubly link list
//The head.prev and the tail.next MUST BE INITIALIZED TO NULL
//Foundational structure of a doubly linked list

//We can think of node is like a car on a railway. Its dumb, it knows nothing about the bigger picture
export class Node {
    data: string;
    prev: Node | null = null;
    next: Node | null = null;

    constructor(data: string) {
        this.data = data;
    }
}

//As soon as we instantiate Node it will look something like this:

// new Node("5")
// null <-|prev|5|next|-> null


//For the big, the one who owns the list
//All it cares about is where the head and tail are and provide operations to manipulate the dumb nodes.
export class DoublyLinkedList {
    //Invariant: head.prev MUST ALWAYS BE NULL
    //Invariant: tail.next MUST ALWAYS BE NULL
    //If any logic ends with these criteria being violated. The Logic is BROKEN

    head: Node | null = null;
    tail: Node | null = null;

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
    addLast(data: string): void {
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
    addFist(data: string): void {
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
    removeLast(): string | null {

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

    printForward(): void {
        let node = this.head;
        const dataList: string[] = [];

        while (node) {
            dataList.push(node.data);
            node = node.next;
        }

        console.log(dataList.join(' -> '));
    }

    printBackward(): void {
        let node = this.tail;
        const dataList: string[] = [];

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

