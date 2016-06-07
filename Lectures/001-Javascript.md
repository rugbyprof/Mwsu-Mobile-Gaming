## Values

JavaScript recognizes the following types of values:


| Type	| Examples of typed values / Notes |
|--------------------|----------------------------------|
|Numbers            	|42, 3.14159 |
|Boolean              |	true / false |
|Strings	           | "Howdy" |
|Null	               | a special keyword denoting a null value; null is also a primitive value. Because JavaScript is case-sensitive, null is not the same as Null, NULL, or any other variant |
|Undefined           |	a top-level property whose value is undefined; undefined is also a primitive value.| 
 
>`Objects` and `functions` are the other fundamental elements in the language. You can think of objects as named containers for values, and functions as procedures that your application can perform.


This relatively small set of types of values, or data types, enables you to perform useful functions with your applications. There is no explicit distinction between integer and real-valued numbers. Nor is there an explicit `date` data type in JavaScript. However, you can use the Date object and its methods to handle dates.


### Data type conversion
JavaScript is a dynamically typed language. That means you do not have to specify the data type of a variable when you declare it, and data types are converted automatically as needed during script execution. So, for example, you could define a variable as follows:

```js
var answer = 42;
```

And later, you could assign the same variable a string value, for example:
```js
answer = "Thanks for all the fish...";
```

Because JavaScript is dynamically typed, this assignment does not cause an error message.

In expressions involving numeric and string values with the + operator, JavaScript converts numeric values to strings. For example, consider the following statements:
```js
x = "The answer is " + 42 // "The answer is 42"
y = 42 + " is the answer" // "42 is the answer"
```

In statements involving other operators, JavaScript does not convert numeric values to strings. For example:
```js
"37" - 7 // 30
"37" + 7 // "377"
```
### Converting strings to numbers
In the case that a value representing a number is in memory as a string, there are methods for conversion.

`parseInt()` and `parseFloat()`

`parseInt` will only return whole numbers, so its use is diminished for decimals. Additionally, a best practice for `parseInt` is to always include the radix parameter.

### Plus operator
An alternative method of retrieving a number from a string is with the + operator.

```js
"1.1" + "1.1" = "1.11.1"
(+"1.1") + (+"1.1") = 2.2   // Note: the parentheses are added for clarity, not required.
```
<sub>Source: [](https://developer.mozilla.org/)</sub>
