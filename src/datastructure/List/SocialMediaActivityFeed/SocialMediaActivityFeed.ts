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
            
            Concept: (Skipped)
            
            Operation analysis natively for this context (linked list):
                - Constructor to construct the feed
                - addHead(data:string): void O(1)
                - removeAt(index:number): void O(n)
                - listTraversal(): Node O(n)

            Design:
                - Class Node {activity:string, index:number, left:node, right:node, size:number}
                (Size act as an invariant and a corruption handler)
                - Size is triggered by Add and removed

                - Remove node will be detached to save memory
                - Class SocialMediaActivityFeed{
                    construct();
                    addHead(data:string):void
                    removeAt(index:number):void 
                    listTraversal(): node
                }

                Invariant (What makes something retain its meaning)
                - Head: Most recent
                - No list = size = 0, head = null, tail = null
                - One node = node's prev & next = null
                - List(Feed) retain its meaning by "Rewiring procedure"
                
                Edge case handle:
                    No list: Return []

                    Delete at head
                    Delete at tail
                    Delete at middle

            Implementation:

            addHead(data:string): void{
            data owns a node(new)
            move head to new node
            (rewires the node along the process)
            }
*/