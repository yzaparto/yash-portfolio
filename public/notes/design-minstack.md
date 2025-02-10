
[Leetcode] (https://leetcode.com/problems/min-stack/description/)


Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the *MinStack* class:

- **MinStack()** initializes the stack object.
- **void push(int val)** pushes the element val onto the stack.
- **void pop()** removes the element on the top of the stack.
- **int top()** gets the top element of the stack.
- **int getMin()** retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

### Design considerations and implementation details

#### Understand the problem with an example
- [5, 9, 4, pop, 12, 3, pop, pop, pop]
- Lets say min element is infinite initially
- Compare 5 to min element -> smaller -> update min element to be 5 and push 5 to the stack.
- Compare 9 to min element -> larger -> no need to update min element var -> push 9 to stack
- Compare 4 to min element -> smaller -> update min element to be 4 and push 4 to the stack.
- Pop operation -> remove 4 from the stack. Now min is not 4 anymore of the stack. This is a problem. Since the min element has been removed I need to ge back to my previous min element. But how? 
	- Go through the stack and find the min -> will take time
	- Need a way to go back to my previous min. Will use another stack to store mins
- stack - hold the elements; min_stack -> hold the min elements, min_element
- Lets start reading the example again and trying to understand how to make it work with 2 stacks with min_element set to infinite initially
- 5 comes in -> push it to stack -> compare 5 with min_element -> smaller -> update min_element to 5 -> push min_element to min_stack
	- stack [5]
	- min_stack [5]
- 9 comes in -> push it to the stack -> compare 9 with min_element -> larger -> dont update min_element -> push min_element to min_stack
	- stack [5, 9]
	- min_stack [5, 5]
- 4 comes in -> push it to the stack -> compare 4 to min_element -> smaller -> update min_element -> push min_element to min_stack
	- stack [5, 9, 4]
	- min_stack [5, 5, 4]
- pop comes along pop from the stack as well as from the min-stack. Now the min element is the one on top of the min stack
	- stack [5, 9]
	- min_stack [5, 5]
- 12 comes in -> push it to the stack -> dont update min_element -> push min_element to the min_stack
	- stack [5, 9, 12]
	- min_stack [5, 5, 5]
- 3 comes in -> updates stack
	- stack [5, 9, 12, 3]
	- min_stack [5, 5, 5, 3]
- pop operation -> pop 5 from stack and 3 from min_stack
	- stack [5, 9, 12]
	- min_stack [5, 5, 5,]
- Lets say you pop all 3. For the case after this when the stack and min_stack looks like this . To get min element I can't pop from min_stack as it is empty. 
	- stack []
	- min_stack []
	- I could check the size of min_stack or have infitiy put as the first element in min_stack when stack is empty.
		- stack []
		- min_stack [infinity]
#### Time and Space Complexity
- Based on the above solution using 2 stack what is the time complexity for
	- Push / pop / getMin / top -> O(1)
- Space Complexity 
	- For 2 stacks -> O(2n) -> O(n)

#### Python code
```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
        self.current_min_element = float('inf')  
        self.min_stack.append(self.current_min_element)
    def push(self, val: int) -> None:
        self.stack.append(val)
        if val < self.current_min_element:
            self.current_min_element = val
        self.min_stack.append(self.current_min_element)
    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()
        **self.current_min_element = self.min_stack[-1]** # Don't forget to upddate the min value
    def top(self) -> int:
        return self.stack[-1]
    def getMin(self) -> int:
        return self.current_min_element
        
# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(val)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()
```

#### Can we use single stack?
- We can make use of single stack instead of 2 stacks
- [5, 9, 4, pop, 12, 3, pop, pop, pop] 
- We can push min and new element pair
	- Stack -> [infinity, 5]
	- Stack -> [infinity, 5, 5, 9]
	- Stack -> [infinity, 5, 5, 9, 4, 4]
- But we are using the same time and space complexity as above with 2 stacks
#### Can we use single stack and have optimal solution?
- Lets start with min_element as infinity.
- Key concept -> Only push the old min_element to the stack when it gets updated wrt t0 min_element otherwise use min_element
- Input stream [5, 9, 4, pop, 12, 3, pop, pop, pop] 
- we see 5 -> min_element gets updated -> push old min_element to stack as it is getting updated -> push the input element
	- stack: [infinity, 5,]
	- min_element: 5
- we see 9 -> min_element stays same -> only 1 element gets pushed to stack and that is the input steam element.
	- stack: [infinity, 5, 9]
	- min_element: 5
- we see 4 -> min_element gets updated -> push old min element to stack -> then the new input stream element
	- stack: [infinity, 5, 9, 5, 4]
	- min_element: 4
- pop -> check the popped element is same as min_element -> if same them pop twice and assign the second popped value to min_element
	- stack: [infinity, 5, 9]
	- min_element: 5
- we see 12 -> min_element is not updated -> push once.
	- stack: [infinity, 5, 9, 12]
	- min_element: 5
- we see 3 -> min_element gets updated -> push the old min element and then the new input stream element.
	- stack: [infinity, 5, 9, 12, 5, 3]
	- min_element: 3
- pop -> popped elemet same as min_element -> pop twice and assign second popped value to min_element.
	-  stack: [infinity, 5, 9, 12]
	- min_element: 5
- pop -> popped element not same as min_element -> pop once and min_element stays same
	- stack: [infinity, 5, 9]
	- min_element: 5
- Is this approach better in terms of space?
	- On average Yes it saves us some space.
	- In worst case it would still be the same
		- When you have input in descending order.
- There is still a problem with this approach. It will not work with 2 elements that end up being min.

- input -> [5, 9, 4, 4, pop, 12, pop, 3, pop, pop, pop, pop]
- We see 5 
	- stack: [inf, 5]
	- min_element: 5
- we see 9
	- stack: [inf, 5, 9]
	- min_element: 5
- we see 4
	- stack: [inf, 5, 9,5, 4]
	- min_element: 4
- **we see 4 again (Lets see the case where we push the old min in the case where the new element is strictly greater**)
	- stack: [inf, 5, 9, 5, 4, 4]
	- min_element: 4
- pop -> is element getting popped equal to min -> pop twice.
	- stack: [inf, 5, 9, 5]
	- min_element: 4
	- Somebody ask for top I would give them 5 but actually it is 4.


Before: 
	- stack: [inf, 5, 9, 5, 4]
	- min_element: 4
go back and use the case when **we see 4 again (Lets see the case where we push the old min in the case where the new element is strictly greater or equal**)
- stack: [inf, 5, 9, 5, 4, 4, 4]
- min_element: 4

#### Python Code
```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.current_min_element = float('inf')  
    def push(self, val: int) -> None:
        if(val <= self.current_min_element):
            self.stack.append(self.current_min_element)
            self.current_min_element = val
        self.stack.append(val)
    def pop(self) -> None:
        popped_val = self.stack.pop()
        if popped_val == self.current_min_element:
            self.current_min_element = self.stack.pop();
            print(self.current_min_element)
    def top(self) -> int:
        return self.stack[-1]
    def getMin(self) -> int:
        return self.current_min_element
```
