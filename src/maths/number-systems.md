---
author: Alex Neville
date: 2023-01-03
title: Number Systems
---

## Natural Numbers

The set of Natural numbers $\mathbb{N}$, is the infinite set of all
non-negative Integers, including $0$.

The _natural numbers_ are those used with the purpose of counting or
ordering. In the sentence _"There are 7 continents."_ the natural number
7 is used to count items, it is used as a _cardinal_. In the sentence
_"Europe is the sixth largest continent by area."_ the natural number
**six** is used to express Europe's position in amongst some items, it
is used as an _ordinal_.

Depending on context, the set of natural numbers may or may not include
zero. In computer science, zero is an important element of the set of
natural numbers. When counting, it is obviously possible to have
$0, 1, 2, 3, \ldots$ items, this is not confusing. Determining the
ordinal position (_index_) of an item in a collection is more ambiguous.
Considering the list $[5,8,4,6]$:

- The index of an item could be expressed as the number of other
  elements ahead of it, including itself. This is called _inclusive_
  indexing. This would make $4$ the _inclusive third_ element in this
  list. In spoken English, this is the convention, though this may not
  be the case in other languages or cultures.

- Alternatively, the index of the same item could be simply expressed by
  the number of items ahead of it, excluding itself. This is called
  _exclusive_ indexing. This would make the element $4$ the _exclusive
  second_ element in the same list. The element $5$ would be called the
  _zeroth_ element of this list. In computing, this is generally the
  convention.

### Natural Number Notation

Every natural number $n$ has a _successor_ $\textbf{S}n$. Any natural
number can be expressed as in terms of this operation and the natural
number $0$. For example $3$ can be represented as $\textbf{SSS}0$. This
is called _unary_ notation. Unary notation is impractical for writing
large natural numbers.

In place of mathematical unary notation, _positional_ notation
(sometimes called place-value notation) is used almost exclusively.
Positional systems have a _base_ or _radix_, which is a natural number
greater than one. With a base of $b$, the first $b$ natural numbers
including zero ($0$ to $b -1$) are represented with a single symbol or
digit. All larger natural numbers are written by multiplying the value
of one of these $b$ digits by its position. As a digit is moved or added
to the left, its value is multiplied by its position. The position of a
digit $a$ in a given numeral is zero indexed from the right to left.

$$a_{n}a_{n-1}a_{n-2} \ldots a_{0}$$

The value of a number written in positional notation is the sum of the
digits multiplied by the radix raised to the power of its position.

$$ a*{n}b^{n} + a*{n-1}b^{n-1} + a*{n-2}b^{n-2} + \ldots + a*{0}b^{0} $$

$$\sum^{n}_{k = 0}a_{k}b^{k}$$

The _decimal_ system (base 10) is most often used and assumed to be the
default base, that is unless another base is explicitly specified. This
is often done with a subscript after the representation of a number.
$11$ is assumed to be the natural number eleven, written in decimal,
rather than three written in binary. $11_2$ is unmistakably binary, but
this specificity isn't always necessary.

|          |        |        |        |        |
| :------- | :----- | :----- | :----- | :----- |
| position | $3$    | $2$    | $1$    | $0$    |
| power    | $10^3$ | $10^2$ | $10^1$ | $10^0$ |
| digit    | $1$    | $0$    | $3$    | $7$    |
| value    | $1000$ | $0$    | $30$   | $7$    |

## Algebraic Structures

An _algebraic structure_ consists of a non-empty set $A$ (know as the
underlying set, carrier set or domain), a collection of operations on
$A$ and a finite set of axioms for operations on $A$ to satisfy.

### Field

A _field_ is one such algebraic structure for which addition,
subtraction, multiplication and division are defined. A field is a set
$F$ equipped with two binary operations: addition and multiplication.
The result of the addition of two elements $a$ and $b$ is called their
sum, written $a+b$. The result of the multiplication of $a$ and $b$ is
called their product, written $ab$, $a \cdot b$ or $a \times b$. Fields
operations have some axioms.

- Associativity of addition: $a + (b + c) = (a + b) + c$.
- Associativity of multiplication:
  $a \cdot (b \cdot c) = (a \cdot b) \cdot c$.
- Commutativity of addition: $a + b = b + a$.
- Commutativity of multiplication: $a \cdot b = b \cdot a$.
- Additive identity element $0 \in F$: $a + 0 = a$.
- Multiplicative identity element $1 \in F$: $a \cdot 1 = a$.
- Additive inverse of all elements $a$ is $-a$: $a + (-a) = 0$.
- Multiplicative inverse of all non-zero elements $a$ is $a^{-1}$:
  $a \cdot {a^{-1}} = 1$.
- Distributivity of multiplication over addition:
  $a \cdot (b + c) = (a \cdot b) + (a \cdot c)$.

The additive inverse of $a$ is written $-a$. The multiplicative inverse
of $a \neq 0$ is written $a^{-1}$. The _\"inverse operations\"_ of
subtraction $a-b$ and division $a/b$ can be defined in terms of the
inverse element of $a$ and $b$.

$$a-b \stackrel{\text{def}}{=} a + (-b)$$
$$a/b \stackrel{\text{def}}{=} a \cdot (b^{-1})$$

A field is similar to a _commutative ring_ with the addition of the
multiplicative inverse for all non-zero elements of $F$. The rational
numbers $\mathbb{Q}$ and real numbers $\mathbb{R}$ form a field.

### Ring & Commutative Ring

A _ring_ is an algebraic structure similar to a field, but without the
need for multiplication to be commutative and the need for elements to
have a multiplicative inverse. In most cases a ring is said to contain
the multiplicative identity element axiom, the list of ring axioms
being:

- Associativity of addition: $a + (b + c) = (a + b) + c$.
- Associativity of multiplication:
  $a \cdot (b \cdot c) = (a \cdot b) \cdot c$.
- Commutativity of addition: $a + b = b + a$.
- Additive identity element $0 \in F$: $a + 0 = a$.
- Multiplicative identity element $1 \in F$: $a \cdot 1 = a$.
- Additive inverse of all elements $a$ is $-a$: $a + (-a) = 0$.
- Distributivity of multiplication over addition:
  $a \cdot (b + c) = (a \cdot b) + (a \cdot c)$.

In number theory, the binary multiplication operation is often
commutative, in which case the set forms a _commutative ring_. If
$a \cdot b = b \cdot a$, where $a$ and $b$ are elements of a ring $R$,
the ring $R$ is a commutative ring and has the additional commutativity
of multiplication axiom.

- Commutativity of multiplication: $a \cdot b = b \cdot a$.

Division is not defined in a ring in the same way division is defined in
$\mathbb{R}$ or $\mathbb{Q}$. As is the case with a field, the
subtraction operation can be defined using the additive inverse axiom.

$$a-b \stackrel{\text{def}}{=} a + (-b)$$

More often than not, rings are commutative and the word ring is used in
place of commutative ring. The set of integers $\mathbb{Z}$ forms a
commutative ring.

### Commutative Semiring

A commutative semiring is an algebraic structure similar to a
commutative ring, but without the requirement that each element of the
carrier set has an additive inverse. A semiring is commutative if its
multiplication is commutative.

- Associativity of addition: $a + (b + c) = (a + b) + c$.
- Associativity of multiplication:
  $a \cdot (b \cdot c) = (a \cdot b) \cdot c$.
- Commutativity of addition: $a + b = b + a$.
- Commutativity of multiplication: $a \cdot b = b \cdot a$.
- Additive identity element $0 \in F$: $a + 0 = a$.
- Multiplicative identity element $1 \in F$: $a \cdot 1 = a$.
- Distributivity of multiplication over addition:
  $a \cdot (b + c) = (a \cdot b) + (a \cdot c)$.

The set of natural numbers $\mathbb{N}$ forms a commutative semiring.

### Closure

A subset of a set is said to be _closed_ under an operation of the
containing set if the result of the operation on a member of a subset
always produces a member of that subset.

## Integer Numbers

The set of integers, denoted $\mathbb{Z}$ is the set of natural numbers,
including zero and the set of negative number. The negative numbers are
the additive inverses of the natural numbers. $\mathbb{N}$ is a subset
of $\mathbb{Z}$. Each integer $a$ has an additive inverse such that
$a+(-a) = 0$, therefore the set of integers forms a commutative ring,
but not a field.

$$\{ \ldots , -3, -2, -1, 0, 1, 2, 3, \ldots \}$$

### Mod & Div

The modulo operation, written $a \text{ mod } b$, returns the remainder
of the division of $a$ by $b$. A modulo operation can be written
$a = m \times b + r$, where $r < b$. The quotient $m$ is the result of
the integer division function div.

$$ 356 \text{ mod } 100 = 56$$ $$ 356 \text{ div } 100 = 3$$

$$
356 = 3 \times
100 +56
$$

$$ 356 \text{ mod } 100 = 44$$ $$ 356 \text{ div } 100 = -4$$

$$
-356 = -4 \times
100 + 44
$$

There are different implementations for `mod` and `div` operations on a
computer. The quotient and remainder are signed for signed modulo
operations. In number theory, floored division is preferred, the
remainder has the same sign as the divisor, as in the examples given
here. This is called `floorMod` or `floorDiv` in some languages.

### Integer Notation

The positional notation used to write natural numbers needs to be
extended to write the negative numbers in the set of integers.

The most simple system is _Sign-magnitude_ notation. Negative numbers
are prefixed with a minus sign, e.g. $-37$. Natural numbers can also be
written with a distinct positive sign, e.g. $+37$. If the sign is
omitted, the number is assumed to be positive. Inversion is very easy
using this notation, changing the sign is the only step. In a computer
system, an additional bit is required to store the sign, making the
range of possible integer values with $n$ bits
$(-2^{n-1} \ldotp \ldotp 2^{n-1})$, with both $+0$ and $-0$ being
stored.

|     | +-  | +4  | +2  | +1  |      |
| --- | :-- | :-- | :-- | :-- | ---- |
| +7  | 0   | 1   | 1   | 1   | 0111 |
| -7  | 1   | 1   | 1   | 1   | 1111 |
| +3  | 0   | 0   | 1   | 1   | 0011 |
| -3  | 1   | 0   | 1   | 1   | 1011 |
| +0  | 0   | 0   | 0   | 0   | 0000 |
| -0  | 1   | 0   | 0   | 0   | 1000 |

_Complement_ notation makes integer arithmetic more practical at the
cost of more complicated inversion. Writing a number in complement
notation is effected by subtracting the absolute or positive value
from 0. The inversion process is consistent in all bases. For any radix
base $b$, the complement of a number can be calculated quickly by taking
each digit\'s complement with $b-1$ and then adding $1$ to the value.

|     |     |     |     |     |     |
| --- | :-- | :-- | :-- | :-- | :-- |
|     | 0   | 0   | 0   | 0   | 0   |
|     |     |     | 2   | 8   | 2   |
| \-  | 1   | 1   | 1   | 1   | 0   |
| =   | 9   | 9   | 7   | 1   | 8   |

In the case of this decimal number, its complement begins with the
repeated digit $9$, which can be written $\dot 9$, a positive number in
the same system begins with $\dot 0$. For any base $b$, a positive
number begins $\dot 0 \ldots$ and a negative number begins
$\dot {(b-1)} \ldots$. So $+282$ and $-282$ in sign-magnitude notation
can be written $\dot 0 282$ and $\dot 9718$ in complement notation.

Two\'s complement is used to store negative integers in binary. The most
significant bit in a word is signed. Numbers beginning $\dot 1 \ldots$
therefore include a negative value and are negative. Two\'s complement
notation includes the additional value $-2^{n-1}$, instead of $-0$
making the range of integers that can be expressed with $n$ bits
$[-2^{n-1} \ldotp \ldotp 2^{n-1})$.

|     |  -8 |  +4 |  +2 |  +1 |      |
| --- | --: | --: | --: | --: | ---- |
| +7  |   0 |   1 |   1 |   1 | 0111 |
| -7  |   1 |   0 |   0 |   1 | 1001 |
| +3  |   0 |   0 |   1 |   1 | 0011 |
| -3  |   1 |   1 |   0 |   1 | 1101 |
| +0  |   0 |   0 |   0 |   0 | 0000 |
| -8  |   1 |   0 |   0 |   0 | 1000 |

### Integer Intervals

An integer interval is a set of consecutive integers, which can be
written compactly by defining its endpoints. $[$, $]$ are used to show
inclusion and $($, $)$ are used for exclusion by convention.

- $[-3 \ldotp \ldotp 2]$ is the set of integers $n$ such that
  $-3 \le n \le 2$
- $[-3 \ldotp \ldotp 2)$ is the set of integers $n$ such that
  $-3 \le n < 2$
- $(-3 \ldotp \ldotp 2]$ is the set of integers $n$ such that
  $-3 < n \le 2$
- $(-3 \ldotp \ldotp 2)$ is the set of integers $n$ such that
  $-3 < n < 2$
- $[4 \ldotp \ldotp 4)$ is the empty set of integers $n$ such that
  $4 \le n < 4$
- $[10 \ldotp \ldotp \infty)$ is the infinite set of integers $n$ such
  that $10 \le n < \infty$
- $\mathbb{Z}$ is the interval $(- \infty \ldotp \ldotp \infty)$
- $\mathbb{N}$ is the interval $[0 \ldotp \ldotp \infty)$

### Integer Lists

For a list of numbers, which the set of integers are sufficient to
demonstrate, the sum and product of a list $L$ are written $\sum L$ and
$\prod L$ respectively.

- $\sum [2,6,9] = 17$
- $\prod [2,6,9] = 108$
- $\sum [4,3,5,7,0] = 19$
- $\prod [4,3,5,7,0] = 0$
- $\sum [] = 0$
- $\prod [] = 1$

## Rational Numbers

A rational number is one which can be represented as a quotient of
fraction of two integers $m$ and $n$ where $n \neq 0$, as in $m/n$ or
$\frac{m}{n}$. The set of rational numbers has the symbol $\mathbb{Q}$.
Every rational number can be written in a unique _irreducible_ form by
requiring that $m$ and $n$ are coprime, this is sometimes called a
rational number\'s canonical form. Two integers are coprime if their
highest common divisor or factor is $1$. Every non-zero rational number
has a multiplicative inverse, making $\mathbb{Q}$ a field.

## Real Numbers

The set of real numbers $\mathbb{R}$ is the set of continuous values,
with arbitrarily small divisions. The real numbers include all of the
rational numbers and other _irrational_ quantities, such as $\pi$ and
$\sqrt{2}$. Real interval are written with a comma, while square and
round brackets retain the same meaning as integer interval notation.

- $[-3 , 2]$ is the set of real numbers $n$ such that $-3 \le n \le 2$
- $[-3 , 2)$ is the set of real numbers $n$ such that $-3 \le n < 2$
- $(-3 , 2]$ is the set of real numbers $n$ such that $-3 < n \le 2$
- $(-3 , 2)$ is the set of real numbers $n$ such that $-3 < n < 2$
- $[4 , 4)$ is the empty set of real numbers $n$ such that $4 \le n < 4$
- $[10 , \infty)$ is the infinite set of integers $n$ such that
  $10 \le n < \infty$
- $\mathbb{R}$ is the interval $(- \infty \ldotp \ldotp \infty)$

### Floor & Ceiling

Floor is the function which returns the greatest integer less than or
equal to a real $a$, written $\lfloor a \rfloor$. Ceiling is the
function which returns the smallest integer greater than or equal to a
real $a$, written $\lceil a \rceil$.

- $\lfloor 8.4 \rfloor = 8$
- $\lceil 8.4 \rceil = 9$
- $\lfloor -6.2 \rfloor = -7$
- $\lceil -6.2 \rceil = -6$

### Modular Arithmetic

Two integers $a$ and $b$ are _congruent modulo_ $n$ if $n>0$ and the
difference of $a$ and $b$ is a multiple of the modulus $n$; there exists
an integer $k$ such that $a - b = kn$.

$$a \equiv b \text{ }(\text{mod } n)$$

In the definition of congruence mod $n$, the brackets means the mod
operation applies to both left and right hand side, it is not just the
modulo of $b$ by divisor $n$. If two numbers are congruent modulo $n$
they have a common remainder $r$ when divided by $n$.

$$a = pn + r$$ $$b = qn + r$$

If $a \equiv x \text{ }(\text{mod } n)$ and
$b \equiv y \text{ }(\text{mod } n)$:

$$a + b \equiv x+y\text{ }(\text{mod } n)$$
$$a - b \equiv x-y\text{ }(\text{mod } n)$$
$$a \times b \equiv x \times y\text{ }(\text{mod } n)$$

#### Rings of Modular Arithmetic

Congruence modulo $n$ is an equivalence relation and an integer $a$ has
the equivalence class $\overline{a}_n$, known as the _congruence class_
or _residue class_, all the numbers which have the same remainder when
divided by $n$. The set of all residue classes of the integers modulo
$n$, $\mathbb{Z}_n$ or $\mathbb{Z}/n\mathbb{Z}$ is know as the _least
residue system_ and defined to be:

$$\mathbb{Z}_n = \{a \text{ mod } n \text{ }| \text{ } a \in \mathbb{Z}\} = \{0, \ldots, n-1\}$$

For integers in this set some functions can be defined:

$$a +_{n} b \stackrel{\text{def}}{=} (a+b) \text{ mod } n$$
$$a -_{n} b \stackrel{\text{def}}{=} (a-b) \text{ mod } n$$
$$a \times_{n} b \stackrel{\text{def}}{=} (a \times b) \text{ mod } n$$

$\mathbb{Z}$ is linked to $\mathbb{Z}_n$:

$$(a + b) \text{ mod } n = (a \text{ mod } n) +_{n} (b \text{ mod } n)$$
$$(a - b) \text{ mod } n = (a \text{ mod } n) -_{n} (b \text{ mod } n)$$
$$(a \times b) \text{ mod } n = (a \text{ mod } n) \times_{n} (b \text{ mod } n)$$

#### Fields of Modular Arithmetic

An element $a$ of $\mathbb{Z}_n$ has a multiplicative inverse if and
only if $a$ is coprime with $n$. If $n$ is prime then all the elements
of $\mathbb{Z}_n$ are coprime with $n$ and have a multiplicative
inverse. $\mathbb{Z}_n$ forms a field when $n$ is prime.
