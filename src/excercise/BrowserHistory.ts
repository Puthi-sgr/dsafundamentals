//Define a browser history class which modelled a doubly linked list

import { DoublyLinkedList, Node } from "../datastructure/List/DoublyLinkedList/Concept";

export class BrowserHistory {
    private historyList = new DoublyLinkedList<string>();
    private current: Node<string> | null = null; //The current models the user current position in a page

    //Add new page (Mutation behavior)
    //3 Possible cases when you visit a new url
    //1. No history at all
    //2. You are at the end of the history
    //3. You are in the middle of the history

    /*
        1. No history
            if(current == null)
        2. You are at the end of the history
            if(current != null && current == tail)
                - create new node to the structure
                - move tail position to the last
            
        3. You are some where in the middle
            if(current != tail && current != null)
                - cut of the node after current
                - create new node
                - rewire current next to the new node
                - move tail to the new node
    */
    visitPage(url: string): void {
        //case 1
        if (this.current == null) {
            this.historyList.addFist(url);
            this.current = this.historyList.head;
            return;
        }

        if (this.current != null) {

            //case 2
            if (this.current == this.historyList.tail) {
                this.historyList.addLast(url);
                this.current = this.historyList.tail;
                return;
            } else {
                //case 3
                this.historyList.removeAfter(this.current);
                this.historyList.insertAfter(this.current, url);
                this.current = this.historyList.tail;
                return;
            }
        }
        return;
    }

    //goBack (non-mutation behavior)
    /*
        3 possible cases
            1. No history at all
            2. Current position is at head
            3. Current position is somewhere in the middle

        3. Current position is somewhere in the middle
            - move the current to prev
            - return the current data
     */
    goBack(): string | null {
        //case 1
        if (this.current == null) {
            return null;
        }
        //case 2
        if (this.current.prev == null && this.current == this.historyList.head) {
            return null;
        }

        //case 3
        this.current = this.current.prev;
        return this.current!.data;
    }

    //go Forward (non-mutation behavior)
    /*  
        3 possible cases
            1. No history at all
            2. Current position is at tail
            3. Current position is somewhere in the middle

        3. Current position is somewhere in the middle
            - move the current to next
            - return the current data
     */
    goForward(): string | null {
        //case 1
        if (this.current == null || this.historyList.tail == null) {
            return null;
        }
        //case 2
        if (this.current.next == null && this.current == this.historyList.tail) {
            return null;
        }

        //case 3
        this.current = this.current.next;
        return this.current!.data;
    }

    //get current page (non-mutation behavior)
    /* 
        2 possible cases
            1. No current page
            2. There is a current page
    */
    getCurrentPage(): string | null {
        //case 1
        if (this.current == null) {
            return null;
        }

        return this.current!.data;
    }
}