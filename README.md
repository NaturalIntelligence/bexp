# Boolean Expression Parser (bexp)



```bash
$ npm install bexp
```

```js
const BexpParser = require("bexp");

const bexpParser = new BexpParser("a and b or c but !d");
bexpParser.test("a")
bexpParser.test(["a","b"])
```

Supported expressions example

* a and b or c but !d
* a And b Or c But !d
* a AND b OR c BUT !d
* a + b OR c -d
* a + b || c -d
* a - b
* a && b || c !d
* a && b || c !d

Note: 
* when operand is not given before `not` then it is considered as AND
* `but` is an alias of `and`.

**Boolean Expressions**

```js
const BexpParser = require("bexp");

const bexpParser = new BexpParser();
bexpParser.evaluate("True and false or true but !N")
```

Supported expressions example

* True and false or true but !N
* True And false Or true But !N
* True AND false OR true BUT not N
* True + false OR true -N
* True + false || true -N 
* Yes && false || true !N 
* Y && false || true !N 

Note: 
* when operand is not given before `not` then it is considered as AND
* `but` is an alias of `and`.

## Applications

Use it to evaluate which functional test has to be run when tag expression is given

* @focus
* @All but not @Ignore

Or to build advanced mongodb search queries

* (nodejs or reactjs or angularjs )
* !java
* (sql or mongodb) and (java or nodejs)


