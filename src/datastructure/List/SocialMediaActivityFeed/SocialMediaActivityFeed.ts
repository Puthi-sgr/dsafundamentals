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
    right: Node | null = null;
    left: Node | null = null;
}

class ActivityFeed {
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

    addHead(data: string): void {

    }

    removeAt(index: number): void { }

    resetToHead(): void { }

    getCurrent(): string | null { }

    next(): string | null { }

    prev(): string | null { }

    getSize(): number {
        return this.size;
    }

    - Constructor to construct the feed
    - addHead(data: string): void O(1)
        - removeAt(index: number): void O(n)
            - getSize(): number
                - resetToHead(): void
                    - getCurrent(): string | null
                        - next(): string | null
                            - prev(): string | null
}