
### **Design a HashSet Without Using Any Built-in Hash Table Libraries**

Leetcode Problem: https://leetcode.com/problems/design-hashset/description/
Implement the _MyHashSet_ class with the following methods:

- **void add(key)**: Inserts the value key into the HashSet.
- **bool contains(key)**: Returns whether the value key exists in the HashSet.
- **void remove(key)**: Removes the value key from the HashSet. If key does not exist in the HashSet, do nothing.

#### **Constraints:**
- 0 <= key <= 10^6
- At most 10^4 calls will be made to add, remove, and contains.

---

### **Implementation Details and Considerations**

#### **What is a HashSet?**
- A HashSet is mainly used when we need to find, access, or search for elements in constant time O(1).
- A HashSet contains only keys, unlike a HashMap, which stores key-value pairs.
- It always contains unique elements. If a duplicate key is inserted, it overwrites the existing key.

#### **Implementation Methods**
We will implement the HashSet using two different approaches:
1. **Double Hashing**
   - Uses two hash functions.
   - The key is processed through the first hash function and then through the second hash function to minimize collisions.
2. **Linked List**

#### **Can We Use an Array of Size 10^6 to Hold All the Keys?**
- No! A large amount of space would be wasted. Imagine having only three keys but still allocating space for 10^6 elements.

---

### **Double Hashing Approach**

There is an optimization trick for solving this problem. Given that the upper bound of the key range is 10^6, we can take the square root, which is 10^3 (i.e., 1000). This allows us to use a nested array approach:
- The **primary array** will have a size of 10^3 and will be initialized to null.

#### **First Hashing Function**
The first hash function is:

PrimaryIndex = key % size of primary array

- If the primary array size is 10^3 (1000), then the modulo operation ensures that the values fall within the range [0, 999].
- Example: 1003 % 1000 = 3. We check index 3 in the primary array. If it is null, we create a secondary array.

#### **Size of the Secondary Array**
- The secondary array should also be of size 1000, ensuring that with a 10^3 × 10^3 structure, we can address all unique keys.

#### **Second Hashing Function**
If we use the same hash function for both steps, we may run into collisions. For example:
- The first hash function maps both 1003 and 2003 to index 3 in the primary array.
- If the second hash function also uses key % size, it will again return 3, causing a collision.

To prevent this, we define the second hash function as:

SecondaryIndex = key / size of secondary array

- Example:
  - SecondHashFunc(1003) = 1003 / 1000 = 1
  - SecondHashFunc(2003) = 2003 / 1000 = 2
  - Since the computed indices are unique, collisions are avoided.

---

### **Boolean vs. Integer Array**
- Do we need an integer array? **No**.
- Our operations (add, remove, contains) can be efficiently handled with a **boolean array**.
- A boolean array consumes **less space** than an integer array.

---

### **Properties of a Good Hashing Function**
1. **Deterministic** – The same key should always produce the same hash value.
2. **Uniform Distribution** – It should distribute values evenly to minimize collisions.

---

### **Handling Edge Cases**
A problem arises with the last element, 10^6:
- The first hash function gives:

10^6 % 10^3 = 0

- The second hash function gives:

10^6 / 10^3 = 1000

  However, our secondary array indices range from [0, 999], leading to an **index out of bounds** error.

#### **Solution**
- Instead of a **1000 × 1000** structure, **increase the primary array size to 1001**.
- This ensures we avoid an **out-of-bounds exception**.

#### Java Code

```java
class MyHashSet {
	int buckets;
	int bucketIndex;
	boolean [][] storage;

public MyHashSet() {
	this.buckets = 1000;
	this.storage = new boolean[buckets][];
}

private int firstHashFn(int key) {
	return key % this.buckets;
}

private int secondHashFn(int key) {
	return key / this.buckets;
}

public void add(int key) {
	int bucket = firstHashFn(key);
	int index = secondHashFn(key);
	if(this.storage[bucket] == null){
		if(bucket == 0)
			this.storage[bucket] = new boolean[this.buckets + 1];
		else
			this.storage[bucket] = new boolean[this.buckets];
	}
	this.storage[bucket][index] = true;
}

public void remove(int key) {
	int bucket = firstHashFn(key);
	int index = secondHashFn(key);
	if(this.storage[bucket] != null)
		this.storage[bucket][index] = false;
}

public boolean contains(int key) {
	int bucket = firstHashFn(key);
	int index = secondHashFn(key);
	if(this.storage[bucket] == null)
		return false;
	else
		return this.storage[bucket][index];
}
}
/**

* Your MyHashSet object will be instantiated and called as such:
* MyHashSet obj = new MyHashSet();
* obj.add(key);
* obj.remove(key);
* boolean param_3 = obj.contains(key);
*/

```


#### Python Code

```python
class MyHashSet:
def __init__(self):
	self.totalBuckets = 1000
	self.storage = [None] * self.totalBuckets # creating an array called storage = [None, None, ......]

def add(self, key: int) -> None:
	bucket = self._first_hashfn(key)
	index = self._second_hashfn(key)
	if (not self.storage[bucket]):
		if(bucket == 0):
		self.storage[bucket] = [None] * (self.totalBuckets + 1)
		else:
		self.storage[bucket] = [None] * self.totalBuckets
	self.storage[bucket][index] = True

def remove(self, key: int) -> None:
	bucket = self._first_hashfn(key)
	index = self._second_hashfn(key)
	if(self.storage[bucket]):
		if(self.storage[bucket][index]):
			self.storage[bucket][index] = False

def contains(self, key: int) -> bool:
	bucket = self._first_hashfn(key)
	index = self._second_hashfn(key)
	if(self.storage[bucket]):
		if(self.storage[bucket][index]):
			return True
	return False;

def _first_hashfn(self, key: int) -> int:
	return key % self.totalBuckets

def _second_hashfn(self, key: int) -> int:
	return key // self.totalBuckets
# Your MyHashSet object will be instantiated and called as such:
# obj = MyHashSet()
# obj.add(key)
# obj.remove(key)
# param_3 = obj.contains(key)
```


Time Complexity:
- Add / Remove / Contains would all have time complexity of O(1)
Space Complexity:
- Worst case would be O(10^6 + 1)


