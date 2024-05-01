/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } 
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val){
    let newNode = new Node(val);

    if (this.head === null){
      this.head = newNode;
    } 
    else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx >= this.length){
      throw new Error("Index out of bounds");
    }

    let current = this.head;
    let count = 0;

    while (count < idx){
      current = current.next;
      count++;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length){
      throw new Error("Index out of bounds");
    }

    let current = this.head;
    let count = 0;

    while (count < idx){
      current = current.next;
      count++;
    }

    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Index out of bounds");
    }

    if (idx === 0) {
      this.unshift(val);
      return;
    }

    if (idx === this.length) {
      this.push(val);
      return;
    }

    let newNode = new Node(val);
    let current = this.head;
    let count = 0;

    while (count < idx - 1) {
      current = current.next;
      count++;
    }

    newNode.next = current.next;
    current.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    if (idx < 0 || idx >= this.length) {
      throw new Error("Index out of bounds");
    }

    let deletedNode;
    let current = this.head;

    if (idx === 0) {
      deletedNode = this.head;
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
    } else {
      let count = 0;
      while (count < idx - 1) {
        current = current.next;
        count++;
      }
      deletedNode = current.next;
      current.next = current.next.next;
      if (idx === this.length - 1) {
        this.tail = current;
      }
    }

    this.length--;
    return deletedNode.val;

  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0;
    }

    let sum = 0;
    let current = this.head;

    while (current) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
    
}

module.exports = LinkedList;
