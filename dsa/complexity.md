---
author: Alex Neville
date: 2023-01-12
title: Performance and Complexity
---

The _performance_ of an algorithm refers to its resource usage: memory
consumption, running time or both. Both factors are important when
choosing an algorithm, but more often than not it is time complexity
being measured.

The running time of an algorithm is not an effective method of
quantifying its performance, as the same algorithm run on different
machines, or implemented in a different language, may not run for the
same length of time. Instead, the number of steps taken to solve a
problem is a more consistent measure of time performance. Space
performance is easier to calculate as the number of bytes required in
memory for the algorithm to run.

Performance itself is not a useful metric, it does not capture how the
number of steps increases with the size of the problem. Performance
parameterised by input size is know as _complexity_. An algorithm might
take $n$ steps on a input size of $n$, or $n^2$ steps on the same input
size $n$.

Some algorithms may take longer under different input conditions, for
example linear search is much faster if the element to find is first in
a list than if the element doesn't appear in the list at all. The
complexity of this algorithm can be measured under different cases, e.g.
in the _best case_, where the element to find is at the start of the
list (constant time complexity); the _average case_, where the element
is in the middle of the list ($n/2$ complexity) or the _worst case_,
where the element to find doesn't appear in the list ($n$ complexity).

## Big O Notation

Presented with a function expressing the exact complexity of an
algorithm, _big O_ notation simplifies the complexity to its most
significant headline complexity. If $f(n)$ is the sum of many terms,
then only the term with the highest growth rate is taken. Any constant
factor, coefficient or term that doesn't depend on the input size (any
overhead) can be ignored. The resulting expression is known as a
_complexity class_.

As an example, the function $f(n) = 3n^2 + 6n +10$ can be simplified to
the complexity class $n^2$. $f(n)$ is _big O_ of $n^2$, written more
simply $O(n^2)$. The function $f(n)$ is said to belong to a complexity
class, often written $f(n) = O(n^2)$. Note that in $O(g(n))$, $O$ is not
a function, it is shorthand for the _"class of functions with complexity
of order $g(n)$"_, the same expression could also be written
$f(n) \in O(g(n))$.

In formal terms, a function $f$ belongs to complexity class $O(g)$ if
there exists a constant $C > 0$ such that for all $n \ge n_0$,
$f(n) \le Cg(n)$; At some point the function $g$ is larger than the
function $f$.

$$f(n) = O(g(n)) \iff |f(n)| \le |Cg(n)|$$

A function is _at most as fast growing_ as (grows no faster than) the
complexity class it belongs to. A function also belongs to all the
complexity classes larger than it, although this is less informative. A
function with complexity $O(n)$ also belongs to $O(n^2)$ and $O(n^3)$.

$$O(1) \subseteq O(\log_2 \log_2 n) \subseteq O(\log_2 n) \subseteq O(n) \subseteq O(n log_2 n) \subseteq O(n^2) \subseteq O(n^3) \subseteq O(2^n)$$

## Little o Notation

Little $o$ notation is a stricter upper bound for a function\'s
complexity. Functions that are $o(g(n))$ are also $O(g(n))$, but the
opposite is not always true. Little o complexity means that $g(x)$
_grows faster than_ $f(x)$.

$$f(n) = o(g(n)) \iff \lim_{n \to \infty} \dfrac{f(n)}{g(n)} = 0$$

The function $2n^2$ is $O(n^2)$ in complexity and also belongs $O(n^3)$,
but $2n^2 \neq o(n^2)$. Therefore $2n^2 = o(n^3)$. $o(g(n))$ is said to
_dominate_ $f(n)$.

$$\lim_{n \to \infty} \dfrac{2n^2}{n^2} = 2$$

$$\lim_{n \to \infty} \dfrac{2n^2}{n^3} = \lim_{n \to \infty} \dfrac{2}{n} = 0$$

## Omega Notation

A lower bound on the growth of $f(n)$. A function grows _at least as
fast_ as $g(n)$.

$$f(n) = \Omega(g(n)) \iff |f(n)| \ge |Cg(n)|$$

## Theta Notation

As an upper bound $f(n) = \Theta(g(n))$ is similar to big $O$, but
additionally specifies a lower bound by a second constant multiple of
$g(x)$.

$$f(n) = \Theta(g(n)) \iff C_1g(n) \le f(n) \le C_2g(n)$$
$$f(n) = \Theta(g(n)) \iff f(n) = O(g(n)) \land f(n) = \Omega (g(n))$$

The functions $f$ and $g$ grow just _as fast as_ each other,
$f(n) = O(g(n))$ and $g(n) = O(f(n))$. In big $O$ notation, it is
possible for a function to be part of multiple larger complexity
classes. This is not possible in theta notation.

$$3n^2 + 2n + 1 = O(n^2)$$ $$3n^2 + 2n + 1 = \Theta(n^2)$$
$$3n^2 + 2n + 1 = O(n^3)$$ $$3n^2 + 2n + 1 \neq \Theta(n^3)$$

## Asymptotically Equal

Asymptotically equal complexity has the same relationship with Theta, as
little $o$ has to big $O$. It is a stricter upper and lower bound.

$$f(n) \sim g(n) \iff \lim_{n \to \infty} \dfrac{f(n)}{g(n)} = 1$$

## Amortized Complexity

The measures of best, average and worst case complexity quantify the
performance of one operation on a given input size. In some cases, the
difference between the average and worst case scenario is small and
large in other situations. If the worst case scenario occurs
infrequently, big $O$ may not be an accurate assessment of the
algorithm's complexity.

Amortized complexity is measured over a number of successive operations.
This measure is ideal for describing algorithms which perform one or
more expensive operations to accelerate subsequent operations.
