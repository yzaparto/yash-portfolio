
Leetcode Problem: https://leetcode.com/problems/design-hashset/description/

**Design a HashSet without using any built-in hash table libraries.**
Implement _MyHashSet_ class:
- `void add(key)` Inserts the value `key` into the HashSet.
- `bool contains(key)` Returns whether the value `key` exists in the HashSet or not.
- `void remove(key)` Removes the value `key` in the HashSet. If `key` does not exist in the HashSet, do nothing.
Constraints:
- `0 <= key <= 10^6`
- At most `104` calls will be made to `add`, `remove`, and `contains`.

**Implementation Details and Considerations**
- What is a HashSet
	- Hashset is mainly used wherever we need to find / access or search in constant time O(1)
	- HashSet would only contain keys and not a key value pairs.
	- It would always have unique elements. If a duplicate key comes in then it would overwrite that key.
- We would be implementing using 2 different methods
	- Double Hashing
		- We have 2 hash functions.
		- Put the key through first hash func -> put the key through another hash func in hope of avoiding collision.
	- LinkedinList

- Can I use an array of size 10^6 to hold all the keys? Would that be a good way?
	- No! A lot of space would be wasted. Imaging that you have just 3 keys but still would have allocated space for  10^6.

**Double Hashing**
>There is a hack for solving this. Lets say that we have been given the upperbound on the range that is 10^6. We take the square root of 10^6 this is 10^3. So for this problem we would use nested arrays and the primary array would have size 10^3.

We would declare a primary array of size 10^3 to null.
- The first hashing func would **key % size of the primary array**.
	- If we are doing a mod then we are operation in the range 0 to 999 if size of primary array is 10^3 or 1000.
- 1003 % 1000 would give us 3. So lets look at index 3 in the primary array. We see that it is null. Therefore create a secondary array of size?? The size would be 1000. So that with 10^3 X 10^3 I would be able to address all the unique addressed.
- So what should be the second hashing func? If we have the same hash func as the first one i.e key % size then lets take an example to see what problem we will run into.
	- the firs hash func would give 3 as the answer for both 1003 and 2003.
	- If we have now again the same hash function then inside the secondary array at index 3 (because first hash func led us here) we do the same hash func and get 3 again which would lead to collision of these 2 keys. We need to come up with a key that gives unique positions for 1003 and 2003.
	- Second Hash func: **Key / size of secondary array**
	- So now SecondHashFunc(1003) would be 1 and SecondHashFunc(2003) would be 2. Which are unique keys.
- Instead of the boolean array do I need an integer array?
	- All I need to do is add a key, remove a  key and tell whether the key is there or not.
	- This could be done with a boolean array.
		- Occupies less space than the integer value and hence no need for integer array.
- What are the properties that the hashing function should have?
	- It should be deterministic. Every time the same key is given it should return the same output.
- There is still a problem with our approach?
	- Lets see what happens to the last element. 10^6
	- First hash function would give 10^6 % 10^3 = 0, then the second hash func would give 10^6 / 10^3 would give 1000 but the array secondary index is limited upto 999. 
	- How to solve? Have the first array as 1001 instead of 1000 shape to fix this. Would not lead to index array out of bounds exception.
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


