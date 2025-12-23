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
        - Each nodes will have its own index to be deleted later O(n) ops here
        - Current index will represent the current user's position in the feed to move back and forth
        - Initial load up will show all of the activity and for every activity event, the list will be refresh and show the most recent ones (Head)
            

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
                Doubly linked list consist of left,right nodes, the nodes is the activity
                semantic invariant:
                    - Recency rule: The list ordered most recent first (Implemented)
                    - addActivity: means if you add x, x will appear first  <-x <-> y <-> z -> (Implemented)
                    - deleteActivity at index: remove the node the at index and rewire remaining nodes
                    - showActivities: Display the data from the node list map to an array and display to UI
                    - Empty meaning: No activities just return an empty mapped array []
                    - Navigation we will use index as the user position.


            Operation analysis natively for this context (linked list):
                - Constructor to construct the feed
                - addHead(data:string): void O(1)
                - removeAt(index:number): void O(n)
                - listTraversal(): Node O(n)

            Design:
                - Add size that belongs to the entire list as the source of truth the tells the size of feed.
                - Size is triggered by Add and removed

                How you handle edge case, its an option
                Edge case handle:
                    No list: Return []

                    Delete at head
                    Delete at tail
                    Delete at middle

            Implementation:                
                Implementation invariant (What makes something retain its meaning):

                One node = head.next === null && head.prev === null, tail === head
                No list = size === 0, head === null && tail === null
                Multi list = head != null && head.next != null
                
                - Recency rule: 
                    addHead must insert new node at head and keep the tail the same
                    rewire rules: 
                        if(size === 0 && head === null && tail === null):
                           newNode.next = head, head = newNode, head.prev = null
                        otherwise:
                            newNode.next = head, head = newNode, head.prev = null
                - DeleteActivity: 
                    traverse from head node until it hit to be deleted nodes at index
                    rewires: 
                        if at index at head: head = head.next, head.prev = null (Detach)
                -
                - List(Feed) retain its meaning by "Rewiring procedure"
              - Class Node {activity:string, left:node, right:node}
                (Size act as an invariant and a corruption handler)
            addHead(data:string): void{
            data owns a node(new)
            move head to new node
            (rewires the node along the process)
            }
             - Remove node will be detached to save memory
                - Class SocialMediaActivityFeed{
                    Node:node
                    size:number
                    index:number
                    construct();
                    addHead(data:string):void
                    removeAt(index:number):void 
                    listTraversal(): node
                }
*/