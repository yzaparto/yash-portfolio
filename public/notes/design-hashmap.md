
Design a HashMap without using any built-in hash table libraries.

Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

- **MyHashMap()** initializes the object with an empty map.
- **void put(int key, int value)** inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
- **int get(int key)** returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
- **void remove(key)** removes the key and its corresponding value if the map contains the mapping for the key.

#### Understanding through an example
- put(1, 4) -> put(2, 10) -> put(2, 100) -> get(1) -> get(10) -> remove(10)
- range of keys -> 0 to 10^6
- In Design Hashset we used double hashing and for this we would use linked list.
- Create an array of some arbitrary size and have each element in the index point to a linked list.
	- Tradeoff -> The large the size of initial array the smaller the traversal in the linkedlist.
- Which linked list (and in turn index of the first array) to put the k, v pair?
	- use hashing func -> key % 10^4
- Can we put new k,v pair at the start or end of the linked list for a particular index?
	- Neither start not end blindly.
	- We have to iterate over the whole linked list and check if the key already exists.
		- If key exists -> update the value for that particular node in linked list
		- Otherwise add the node at the end of linked list.
- To remove the key
	- Find the index of the array
	- Traverse through the linkedlist
		- Modify the chains of the linked list according for the nodes before and after the one to be deleted.
			- For singly linked list, maintain a previous pointer.
		- If lets imagine the linked list of length 3 then if we want to delete the first node we can't using this previous pointer and would have to write the logic separately. Instead to avoid this we can always add a dummy node as the first node to all the linked list so that we do no run into this issue. This dummy node should have keys outside the range 0 to 10^6
			- Use key as -1 and value -1
- To get the value of the key
	- Get the index of the array through hashing func.
	- Traverse through the linkedlist and return the value.

#### Python Code
```python
class MyHashMap:
    class Node:
        def __init__(self, key, value):
            self.key = key
            self.value = value
            self.next = None

    def __init__(self):
        self.buckets = 10000
        self.storage = [None] * self.buckets
    
    def _hashFunc(self, key: int):
        return hash(key) % self.buckets

    def _find(self, head: Node, key: int) -> Node:
        prev = head
        current = head.next
        while(current and current.key != key):
            prev = current
            current = current.next
        return prev
    
    def put(self, key: int, value: int) -> None:
        bucket = self._hashFunc(key)
        new_node = self.Node(key, value)
        head_node = self.storage[bucket]
        if(not head_node):
            dummy_node = self.Node(-1, -1)
            dummy_node.next = new_node
            self.storage[bucket] = dummy_node
        else:
            prev_node = self._find(head_node, key)
            if prev_node.next == None:
                prev_node.next = new_node
            else:
                prev_node.next.value = value

    def get(self, key: int) -> int:
        bucket = self._hashFunc(key)
        if(not self.storage[bucket]):
            return -1
        head_node = self.storage[bucket]
        find_node = self._find(head_node, key)
        if find_node.next == None:
            return -1
        else:
            return find_node.next.value

    def remove(self, key: int) -> None:
        bucket = self._hashFunc(key)
        if(not self.storage[bucket]):
            return
        head_node = self.storage[bucket]
        prev_node = self._find(head_node, key)
        if prev_node.next:
            prev_node.next = prev_node.next.next
```