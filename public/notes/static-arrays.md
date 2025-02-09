
# Static Arrays
- In statically typed languages like Java, C++ and C#, arrays have to have an allocated _size and type_ when initialized. These are known as **static arrays**.
- They are called static because the size of the array cannot change once declared. And once the array is full, it can _not_ store additional elements.
- Some dynamically typed languages such as Python and JavaScript do not have static arrays to begin with. They use dynamic arrays.

## Reading from an array

- To read an individual element from an array we can choose the position we want to access via an **index**. Below we have initialized an array of size 3 called _myArray_. We also attempt to access an arbitrary element using the index _i_.

```python
# initialize myArray
myArray = [1,3,5]

# access an arbitrary element, where i is the index of the desired value
myArray[i]
```

- Accessing a single element in an array is always instant because each index of _myArray_ is mapped to an address in the RAM. Regardless of the size of the input array, the time taken to access a single element is the same. We refer to this operation as O(1) in terms of time complexity.

## Traversing through an array

- We can also read all values within an array by traversing through it. Below are examples of how we could traverse _myArray_ from the start to the end using loops.

```python
for i in range(len(myArray)):
    print(myArray[i])

# Or

i = 0;
while i < len(myArray):
    print(myArray[i])
    i++
```

> The last element in an array is always at index n−1 where n is the size of the array. If the size of our array is _3_, the last accessible index is _2_.

To traverse through an array of size n the time complexity is O(n). This means the *number of operations grows linearly* with the size of the array.