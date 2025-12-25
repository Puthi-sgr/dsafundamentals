/*
    Social Media Activity Feed
    Contract:
        goals:
           - Design a social media activity feed system using a Doubly Linked List. (Partially solved)
           - The system should maintain a list of recent activities and allow users to navigate through them.(Partially solved)

        requirements:
            1. addActivity(activity: string): void  (Partially solved)
                Adds a new activity to the feed (most recent) 
            2. deleteActivity(index: number): void (Partially solved)
                Removes an activity at the specified index.
            3. showActivities(): string[] (Partially solved)
                Returns all activities in order (most recent first).
            
        constraints:
            Must use a Doubly Linked List to store activities. (Checked)
            No built-in arrays or lists allowed for storing activities directly
    
    Concept:
        - Feed: A wrapper, a list wrapping around certain thing.
        - Social media activity: commenting, liking, posting, following and other event based stuff
        - activity: Are the small event made by a user

        - Social media activity feed: A wrapper showing a list of commenting, liking, posting made by the user
        - navigate: in this context, it means that the user should be able to scroll around the activity list and can add activity and remove activity
        system: refer the owners the component to who managers this social media activity which runs by the doubly linked list
        - Doubly linked list: a list of dumb nodes connect together via a right  and left reference that points to another dumb nodes. It has head and tails
        - Maintain Recent activities: Invariant - The activity add at the most recent time is the most recent activity and it must be at the front of the linked list storage
        
    Operation Analysis:
        (The operations have already been broken down by the requirement)

    Design:
        - The component is the social media
        - Use a doubly linked list to represent the "feed" with heads and tail
        - The head represent the most recent activity 
        - Current index will represent the current user's position in the feed to move back and forth
        - Initial load up will show all of the activity and for every activity event, the feed will be refresh and show the most recent ones
            

    Design decomposition:
        Doubly linked list (feed) in this context:
            Contract:
                goals:
                    - Able to represent the feed
                    - Have functional operations to help:
                        1. addActivity(activity: string): void  (Partially solved)                            
                        2. deleteActivity(index: number): void (Partially solved)
                        3. showActivities(): string[]
                        
                what we have:
                    - Define linked list in our directory
            
            Concept:
                - Doubly linked list consist of left,right nodes, the nodes is the activity

                semantic invariant:
                    - Recency rule: The list ordered most recent first (Implemented)
                    - addActivity: means if you add x, x will appear first  <-x <-> y <-> z -> (Implemented)
                    - deleteActivity at index: remove the node the at index and rewire remaining nodes
                    - showActivities: Display the data from the node list map to an array and display to UI
                    - Empty meaning: No activities just return an empty mapped array []

                Operation analysis natively for this context (linked list):
                    - Constructor to construct the feed
                    - addHead(data:string): void O(1)
                    - removeAt(index:number): void O(n)
                    - getSize(): number
                    - resetToHead():void
                    - getCurrent():string | null
                    - next():string | null
                    - prev():string | null

                Edge case analysis:
                    state bucket (Focuses on the application level, which is the feed):
                        - Empty feed = empty list
                        - 1 Activity = one node
                        - Multiple activities = 2+ nodes   

                    position bucket(The valid and invalid position that an operation can be in this structure of this linked list):
                        valid:
                            - Head
                            - Middles:                           
                            -Tail
                        invalid:                    
                            - if index beyond these structure
                            - if index bigger or smaller than size

                    process bucket:
                        pre-condition:
                            - removeAt: require valid index
                            - addHead: require valid string activity
                        during operation:
                            - addHead: rewires the list back to new node
                        post-condition:
                            - class invariant still holds: head still head, tail, rewired

            Design:
                - Null head & tail when empty to keep things simple
                - removeAt: deleting node must detach to avoid corruption
                - Declare size that belongs to the list and tell the size of the list
                - Size is triggered by Add and removed
                - Recency rule: New Nodes added is the new head
                - Cursor based navigation:
                    Declare field current.
                    Navigation methods:
                        resetToHead():string | null if head null return null
                        getCurrent():string | null if current null return null
                        next():string | null if next null keep current
                        prev():string | null if prev null keep current
               
                - addActivity: if no list, new node becomes and tail, if activity is  " " invalid
                - deleteActivity at index: if index beyond size return invalid
                - showActivities: node data in string is processed out cut out white spaces
               
            Implementation:                
                Implementation state invariant:
                    - One node = head.next === null && head.prev === null, tail === head
                    - No list = size === 0, head === null && tail === null
                    - Multi list = head != null && head.next != null
                
                Invalid boundary:
                    - if(index > 0 || index < size)           
*/

class Node {
    data: string = "";
    next: Node | null = null;
    prev: Node | null = null;
}

export class SocialMediaActivityFeed {
    current: Node | null = null;
    size: number = 0;
    head: Node | null = null;
    tail: Node | null = null;

    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    /*
         ** Application layer algorithm **
         Algorithm: showActivities
         Edge case analysis:
            - Empty list 
            - One or more nodes
        pre-condition:
            - none
        while finding:
            - start from head
            - traverse through next reference until current is null
            - collect data from nodes an push into result array
        post-condition:
            - array of activities in showing the most recent first order

        operation:
            if head is null return []

            let result: string[] = []
            let current = head

            while current is not null:
                result.push(current.data)
                current = current.next
            return result
    */

    showActivities(): string[] {
        if (this.head === null) return [];

        const result: string[] = [];
        let current = this.head;

        while (current !== null) {
            result.push(current.data);
            if (current.next === null) break;
            current = current.next;
        }

        return result;
    }

    /*
       ** Application layer algorithm **
       Algorithm: addActivity
       - Pre-condition:
           if activity is empty string return
       - Operation:
           call addHead(activity)
       - Post-condition:
            One more activity in the feed
   */
    addActivity(activity: string): void {
        if (activity.trim() === "") return;
        this.addHead(activity);
    }


    /*
        ** Application layer algorithm **
        Algorithm: deleteActivity
        - Pre-condition:
            if index is not positive or index >= size return
        - Operation:
            call removeAt(index)
        - Post-condition:
            One less activity in the feed
    */
    deleteActivity(index: number): void {
        if (index < 0 || index >= this.size) return;
        this.removeAt(index);
    }

    /*
        Edge case analysis:
            - Empty list (handled)
            - One or more nodes (handled)
        Algorithm: addHead:
        - Pre-condition:
            if data is empty string return
        - While changing:
            - create new node
            - rewires the list back to new node
            - transition the head to the new node
            - update size
        - Post-condition: 
            - size increased by 1
            - head is the new node (most recent activity)
            - tail remains the same if list was not empty
        - Operation:
            - if (data.trim() === "") return
            - if no head:
                - create new node, head = newNode, tail = newNode
            - else:
                - create new Node
                - newNode.next = head
                - head.prev = newNode
                - head = newNode
            - size++
 
   
    */
    addHead(data: string): void {
        if (data.trim() === "") return;

        const newNode = new Node();
        newNode.data = data;

        if (this.head === null && this.tail === null && this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {

            newNode.next = this.head;
            this.head!.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        return;
    }

    /*
        Algorithm: removeAt
        Edge cases: 
            - One head or tail
            - Middle node

        - Pre-condition:
            if index is not positive or index >= size return

            if size is 1:
                - head = null
                - tail = null
                - size = 0
                - return
        - while finding:
            - start from head
            - move forward to index by next reference
            - if found node to remove change
            - if current is null return
           
        - while changing:
            - if node to remove is head:
                - toBeRemoved = head
                - head = head.next
                - head.prev = null
                - toBeRemoved.next = null
            else if node to remove is tail:
                - toBeRemoved = tail
                - tail = tail.prev
                - tail.next = null
                - toBeRemoved.prev = null
            else:
                - toBeRemoved = current
                - current.prev.next = current.next
                - current.next.prev = current.prev
                - current.next = null
                - current.prev = null
        size--

        - Post-condition:
            - size decreased by 1
            - head is updated if head was removed
            - tail is updated if tail was removed
            - remaining nodes rewired correctly

    */
    removeAt(index: number): void {
        if (index < 0 || index >= this.size) return;
        let current = this.head;
        let currentIndex = 0;

        while (current !== null) {
            if (currentIndex === index) {
                if (current === this.head) {
                    if (this.size === 1) {
                        this.head = null;
                        this.tail = null;
                    } else {
                        const toBeRemoved = this.head;
                        this.head = this.head.next;
                        this.head!.prev = null;
                        toBeRemoved.next = null;
                    }
                } else if (current === this.tail) {
                    const toBeRemoved = this.tail;
                    this.tail = this.tail.prev;
                    this.tail!.next = null;
                    toBeRemoved.prev = null;
                } else {
                    const toBeRemoved = current;
                    current.prev!.next = current.next;
                    current.next!.prev = current.prev;
                    toBeRemoved.next = null;
                    toBeRemoved.prev = null;
                }
                this.size--;
            }
            current = current.next;
            currentIndex++;
        }
        return;
    }

    /*
        Algorithm: resetToHead
        - Pre-condition: 
            - head is not null
        - Operation:
            - set current to head
        - Post-condition:
            - current points to head node
    */
    resetToHead(): void {
        if (this.head !== null) {
            this.current = this.head;
        }
    }

    /*
        Algorithm: getCurrent
        - Pre-condition:
            - current is not null
        - Operation:
            if current is null return null
            otherwise: return current.data
        - Post-condition:
            - returns the data of the current noe
    */
    getCurrent(): string | null {
        if (this.current === null) {
            return null;
        }
        return this.current.data;
    }

    next(): string | null {
        if (this.current === null || this.current.next === null) {
            return null;
        }
        this.current = this.current.next;
        return this.current.data;
    }

    prev(): string | null {
        if (this.current === null || this.current.prev === null) {
            return null;
        }
        this.current = this.current.prev;
        return this.current.data;
    }

    getSize(): number {
        return this.size;
    }


}
