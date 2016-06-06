
## Minimum Programming Level Assessment

- Using a Python, C++, or Java (or even pseudo code) answer the following questions.
- All example values are only to help understand the problem, your solutions should work with more than just the example data given.
- If you cannot complete this test with an 80% or better, you will need to take another course.

--

### Question 1: 

Using one or more loops, write a code snippet that could generate the following output for any given ***N***: 

Example output where ***N*** = 5

```
*
**
***
****
*****
```
--

### Question 2:

Write a **function** that will **average** every item in an array of `doubles`.
- For example your function would return `3.94` for the array below:
- `double a[] = {3.5, 1.0, 1.5,4,5.5,8.2};`

--

### Question 3:

Write a loop or loops that would print out all the values in an array declared in the 2D array below.
- Print 1 row per line, with spaces between numbers.

`int A[10][10]`

--

### Question 4:

Given these example values:
```
Nums = [3,5,4,7,8,9,2,3,4]
```

Given an array called ***Nums*** that has ***n*** integers, write a loop or loops that will replace all of the even values in ***Nums*** with `-1`.
- Your resulting array would (given the example data) look like this: `[3,5,-1,7,-1,9,-1,3,-1]`

--

### Question 5:

Given these example values:
```
i = 2
j = 6
A = [3,5,4,7,8,9,2,3,4]
```
Write a **function** called `partialSum` that takes two integer parameters ***i*** and ***j***, and an array parameter ***A***. 
- This function should return the sum of all the integers from array index ***i*** to array index ***j*** inclusive. 
- For example: `partialSum( 2, 6 ,A)` would sum `(4 + 7 + 8 + 9 + 2)` and return the value `30`.  
- You can assume that: `0 <= i < j <= A.length()`.

--

### Question 6:

Given the following types:

```cpp
Stack    // has methods push and pop to add and remove items from the stack.
Queue    // has methods push and pop to add and remove items from the queue.
```

After the following commands are executed, show the final state of the stack `S`.

```
Stack S;
S.push(5);
S.push(4);
S.pop();
S.push(7);
S.push(1);
S.push(3);
S.pop();
S.pop();

```

After the following commands are executed, show the final state of the queue `Q`.

```
Queue Q;
Q.push(5);
Q.push(4);
Q.pop();
Q.push(7);
Q.push(1);
Q.push(3);
Q.pop();
Q.pop();

```

### Question 7:

Write a class definition that could be used to represent a 2D coordinate (a point). 
- Your class has one method called `move` which receives two parameters: `dx` and `dy`.
- These parameters would be added to the original coordinates to move the point. 

Example:

```cpp
p = new Point(3,5);
p.move(-2,2);
//p is now at (1,7)

```  

