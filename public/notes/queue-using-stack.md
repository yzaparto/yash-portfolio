[Leetcode Link] (https://leetcode.com/problems/implement-queue-using-stacks/description/)

#### Question
Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

- void push(int x) Pushes element x to the back of the queue.
- int pop() Removes the element from the front of the queue and returns it.
- int peek() Returns the element at the front of the queue.
- boolean empty() Returns true if the queue is empty, false otherwise.

**Notes:**
- You must use **only** standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

### Design Considerations and Implementation Details

#### Basic Concepts
- What is a queue?
	- Linear Data structure in which elements that are first in are first out
- What is a stack?
	- Linear Data structure in which elements that are first in are last out or insertion and deletion of the elements take palce at one end (top) of the stack.
#### Understand though example
- input [1 2, 3, 4, 5, pop / dequeu, 6, pop/deque]
	- Queue -> [1, 2, 3, 4, 5]
	- encounter pop
		- [2, 3, 4, 5]
	- enqueue 6
		- [2, 3, 4, 5, 6]
	- dequeue
		- [3, 4, 5, 6] -> Final Queue
- Take 2 stacks s_in and s_out
	- Push 1 into s_in
		- s_in: [1]
		- s_out: []
	- Push 2 into s_in
		- s_in: [1, 2]
		- s_out: []
	- Push 3 into s_in
		- s_in: [1, 2, 3]
		- s_out: []
	- Push 4 into s_in
		- s_in: [1, 2, 3, 4]
		- s_out: []
	- Push 5 into s_in
		- s_in: [1, 2, 3, 4, 5]
		- s_out: []
	- Deque
		- I want to pop out 1
		- It is at the last. So I transfer all the elements to s_out from s_in
		- s_in: []
		- s_out: [5, 4, 3, 2, 1]
		- Now I can pop from s_out. After popping transfer all the elements back to s_in
		- s_in: [2, 3, 4, 5]
		- s_out: []
	- Push 6
		- Now push 6 to s_in: [2, 3, 4, 5, 6]
		- s_out: []
- The time Complexity of 
	- Push is O(1)
	- but pop is O(n)
- How can we make it better?
	-  input [1 2, 3, 4, 5, pop / dequeu, 6, pop/deque]
	- we see 1
		- s_in: [1, 2, 3, 4, 5]
	- pop
		- treansfer all elements from s_in to s_out and pop th etop one
		- s_out: [5, 4, 3, 2]
		- s_in: []
		- pop 1
	- 6
		- s_out: [5, 4, 3, 2]
		- s_in [6]
	- pop
		- if s_out in not empty, pop from s_out otherwise transfer elemets from s_in to s_out
		- s_out: [5, 4, 3]
		- s_in: [6]
- With this time complexity for 
	- push operation -> O(1)
	- Amortized pop operation -> O(1)
		- Amortized time complexity refers to the average time taken per operation in a sequence of operations within an algorithm, where the cost of expensive operations is "spread out" over a series of less expensive operations, giving a more realistic average time complexity than just looking at the worst-case scenario for a single operation; it's particularly useful when an algorithm occasionally performs a very costly operation but most operations are cheap

#### Python Code
```python
class MyQueue:
    def __init__(self):
        self.s_in = []
        self.s_out = []
        
    def push(self, x: int) -> None:
        self.s_in.append(x)
        
    def pop(self) -> int:
	    self.peek()
	    return self.s_out.pop()
    def peek(self) -> int:
        if(not self.s_out):
            while(self.s_in):
                self.s_out.append(self.s_in.pop())
        return self.s_out[-1];
    
    def empty(self) -> bool:
        return not self.s_in and not self.s_out
    
# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
```
