---
author: Alex Neville
date: 2023-01-10
title: Lists
---

A _list_ is an abstract data type representing a finite number of
ordered values in which the same value may appear more than once. Lists
are frequently implemented with array and linked list data structures,
among others.

## Arrays

An array is a simple data structure which stores items in sequential
memory locations. Arrays can be written as a collection of items inside
square brackets as follows, $[4,3,7,2,9,1,8,6]$. This array has 8
elements, so its _size_ would be considered 8. If this array was
assigned to a variable $a$, its elements can be accessed through their
_index_ $i$ and the indexing notation $a[i]$. Indexing usually begins
from 0, so the valid indices for this list are $0 \ldots 7$, as seen in
figure [fig:array](fig:array).

![An array and its indices](../res/array.svg "array")

Each element may be accessed _sequentially_ by incrementing or
decrementing the index as required, or at random by taking any index -
assuming it is a valid index. For the indexing operation to be
effective, each item in the array is required to be the same size, which
means in practice array elements are of the same type. In a language
such as C, the array $a$ would be considered a pointer to the memory
location of the beginning of the array and the index $i$ is an offset
from the start of the array. This means that $a[0]$ points to the
beginning of the array, the _zeroth_ element. For non zero indices, this
offset is calculated by multiplying the index by a certain number of
bytes equal to the size of each item, $c$. As such the address of $a[i]$
is $a + c \times i$.

## Arrays, Iteration & Invariants

Index access to array elements, makes the array data structure conducive
to sequential access. Iteration over the index variable, which is
repeatedly incremented, enables array elements to be accessed and
processed at run time. A _loop_ is the programming construct
facilitating iteration. It is commonly expressed in pseudocode and C
like syntax.

<div>

[Iteration in pseudocode and C like syntax]{.label}

```{.text}
For i <- 0 ... (N - 1) Do
    use value i

for (i = 0; i < N; i++) {
    // use value i
}
```

</div>

In both of these examples $N$ is an invariant. It does not change in the
loop body or anywhere else in the program. Invariants prevent common
errors such as accessing indices beyond the end of an array. Due to the
static nature of arrays (arrays are allocated once at a certain size),
array size is a common program invariant.

## List ADT

As an abstract data type, a list is defined in terms of its public
functions. A minimal list type can be defined with two _constructors_,
where $E$ is an element of a list and $L$ is a list.

- $\text{emptylist} () \rightarrow L$
- $\text{prepend} (E, L) \rightarrow L$

Any list can be created from a single empty list and a series of prepend
operations. The list $[1,2,3]$ is created with the expression
`prepend(1, prepend(2, prepend 3, emptylist()))`. This is called an
_inductive_ type definition, relying on the repeated application of the
inductive step `prepend(E,L)` on the base case `emptylist()`. Any useful
data type has accessor methods. In the absence of array indices, any
list element can be retrieved with a combination of two _selectors_.

- $\text{head} (L) \rightarrow E$
- $\text{tail} (L) \rightarrow L$

The functions head and tail are not defined for the empty list. An
additional function is required to determine whether a given list is
empty.

- $\text{isemptylist} (L) \rightarrow \text{T}|\text{F}$

With this set of functions, the following expressions are true.

- $\text{isemptylist} (\text{emptylist} ())$
- $\text{not isemptylist} (\text{prepend} (e, l))$
- $\text{head} (\text{prepend} (e, l)) == e$
- $\text{tail} (\text{prepend} (e, l)) == l$

## Recursion & Derived List Procedures

Iteration is the logical and convenient method to process a collection
of elements in an array, due to indexing. With the abstract list
definition and in many list implementations, such as linked lists, there
is no index. It becomes more convenient to process lists with recursion,
although any recursion can be expressed as an iteration. Because of the
inductive construction of the list type, obtaining the last element
requires every element in the list is processed or _traversed_. The
function `last` returns the last element of the list `l`.

<div>

[Return the last element of a list]{.label}

```{.text}
last(L:l) -> E {
    if (isemptylist(tail(l)) return head(l);
    return last(tail(l));
}
```

</div>

This implementation ensures that the `last` function is not recursively
applied to an empty list, although if the function is initially called
on an empty list, `tail` will be passed an empty list, for which it is
undefined. This situation could be handled with an additional condition
in the `last` function.

<div>

[The same, with error handling]{.label}

```{.text}
last(L:l) ->E {
    if (isemptylist(l)) {
        error();
    } else if (isemptylist(tail(l)) {
        return head(l);
    } else {
        return last(tail(l));
    }
}
```

</div>

Appending, rather than prepending, to a list is also a derived function
on this list. For the sake of simplicity, appending a single element `x`
to the end of a list `l1` can be achieved by passing
`prepend(x,emptylist())` in place of `l2`.

<div>

[Append one list to another]{.label}

```{.text}
append(L:l1,L:l2) -> L {
   if (isemptylist(l1)) return l2;
   return prepend(head(l1), append(tail(l1), l2))
}
```

</div>

Modifying the base case slightly, it is possible to write a function
which appends a single element to the end of a list.

<div>

[Append an element to a list]{.label}

```{.text}
append(L:l,E:x) -> L {
   if (isemptylist(l)) return prepend(x, emptylist());
   return prepend(head(l), append(tail(l), x))
}
```

</div>

Many of these derived functions are slow and inefficient. In practice it
might be easier to use some of the underlying implementation details of
a data structure to accelerate more complicated operations and expose
more functions on a type than are technically required. Also absent in
this ADT are _mutator_ functions, which destructively modify a list. In
the functional inductive approach to ADT specification lists are
immutable and each function returns a new list. It is convenient to
return a new immutable list for every operation on a given list, as it
makes a program safe and predictable. There is no concept of state that
can be modified during the course of the program, so applying the same
function on the same set of arguments will produce the same output. The
trade off is the space and time complexity associated with repeated
memory allocation and traversal, yet another reason why complex data
types in programming languages and libraries are truly abstract.

## Linked Lists

Lists contain a finite number of elements, but theoretically this number
has no upper bound. Lists on computers are practically limited in size
by the amount of space or memory available. A list type must allocate
space for the data elements it contains. If the maximum size of a list
is known in advance, an array may be the most effective way too
implement a list. Otherwise, if the size of a list varies at run time, a
more dynamic implementation is required. The first such implementation
is the _linked list_.

The most simple linked list is composed of a sequence of _nodes_ or
_two-cells_. Each contains an element (or a reference to an element) and
a _reference_ to the next node. Figure
[fig:abstract_llist](fig:abstract_llist) is the most abstract graphical
representation of the list $[8,4,1,7,3,6]$. The second of each two-cell
is a reference to the next node, not the first cell of the next node, as
is often depicted.

![An abstract graphical linked list
illustration](../res/abstract_llist.svg "abstract_llist")

In any implementation, the nodes of a linked list are themselves a type,
in most cases hidden from the external interface of a linked list. The
fields or cells of a node may contain a reference to the element, or
hold a copy of the element in place. The second field however **must**
contain a reference to the next node. In a language such as Java, a node
may be a user-defined object.

```{.java}
class Node {
    int data;
    Node next;
}
```

It would appear that a node contains the next node directly, although
this isn't the case. In this Java source `Node` is a reference type.
The allocation of a new node and pointer logic are all handled
implicitly. This is the equivalent of a C structure containing a pointer
to another structure of the same type.

```{.c}
struct Node {
    int data;
    struct Node * next;
}
```

It is not possible for a C structure to contain a field of its own type
as it would appear in Java, as the structure definition is incomplete at
the point the field is declared. Attempting to declare such a structure
is impossible, it would require an infinite amount of memory.

```{.c}
struct Node {
    int data;
    struct Node next; // invalid
}
```

The same linked list is more rigorously represented as a _structure_
containing a start pointer to a node and subsequent nodes are referenced
by a field of the previous node, as in figure [fig:llist](fig:llist), at
the cost of revealing more implementation details. This removes the
confusion of what the second cell of each two-cell references in the
figure [fig:abstract_llist](fig:abstract_llist). The value of each node
can also be written more compactly inside the first two cell.

In short there are practical reasons to model a whole linked list as a
data type in its own right and there are different stylistic approaches
to illustrating linked lists. Compare figures
[fig:abstract_llist](fig:abstract_llist) and [fig:llist](fig:llist).

![A more concrete linked list illustration](../res/llist.svg "llist")

In keeping with the inductive type definition, it is unnecessary to
illustrate both nodes and a dedicated list object. It is still possible
to write a linked list implementation where the only user defined type
is a node. It is useful to have a separate linked list type to store
additional metadata about the list such as size or tail pointers in the
case of a _queue_. In either case, such a type can be abstracted away
and it is assumed there is some reference to the first node somewhere in
the program when a linked list is expressed as a simple collection of
nodes.

As an example of a linked list variation, the last node may reference
the first node, the same as the start pointer. Some program may need to
begin performing an operation at some arbitrary point within the list,
other than the first element, in which case this change is helpful. This
is called a _circular_ linked list.

![A circular linked list](../res/circular_llist.svg "circular_llist")

A _queue_ is a linked list with an additional two-cell pointing to the
front and rear nodes.

![A linked list with start and rear
pointer](../res/queue_llist.svg "queue_llist")

A node could contain a pointer for the next and previous nodes, called a
_doubly-linked_ or _double linked_ list. If the list additionally
implements the circular property, it can behave as a queue (the rear
pointer is the previous node of the start).

![A circular doubly-linked
list](../res/double_circular_llist.svg "double_circular_llist")

## Dynamic Arrays

An array is allocated once with a given size. An array is an ideal
container type, if the data to be stored is of the same form and the
quantity of data is know at compile time. If the maximum size of a data
structure required to store some elements is not known at compile time,
it is still possible to use an array with some additional caveats. An
array capable of growing in this way is known as a _dynamic array_ or
_array list_.

Array size is a type of program invariant, although an array list is
characterised by two variables: the current maximum _capacity_ of the
array and the _size_ or number of elements. Insertion when size is less
than capacity is $O(1)$. Insertion when size is equal to capacity is of
order $O(n)$, the array must be reallocated to make space for more
elements. Figure [fig:array_list](fig:array_list) depicts the growth of
a dynamic array, reallocation is indicated with an arrow.

![Reallocation of an array list](../res/array_list.svg "array_list")

Using an array to implement a data structure has the potential to make
insert/remove/access operations faster, although there are drawbacks
with this approach. For any data structure that is allocated at a given
size, such as an array, it is possible the data structure becomes full,
this condition needs to be handled. Array lists can have worse space
complexity if more space than is required is allocated and under certain
conditions the time complexity of an operation may be worse, such as the
reallocation of memory.

## Stacks

A stack is an abstract data type organises data in _First-In-Last-Out
(FILO)_ or _Last-In-First-Out (LIFO)_ manner. The most recently inserted
item is the first to be removed from a stack. A stack can be defined
inductively with the constructors `emptystack` and `push`, the
conditional `isemptystack` and the selectors `top` and `pop`.

- $\text{emptystack} () \rightarrow S$
- $\text{push} (E,S) \rightarrow S$
- $\text{isemptystack} (S) \rightarrow T|F$
- $\text{top} (S) \rightarrow E$
- $\text{pop} (S) \rightarrow S$

In this stack definition, which does not mutate the state of one stack,
instead creating and returning new stacks as required, `top` returns the
first element of a stack and `pop` returns the remainder of stack,
without the first element. For most practical purposes, a single stack
is used and changed destructively, in which case `push` and `pop` have
different definitions.

- $\text{push} (E,S)$
- $\text{pop} (S) \rightarrow E$

This version of `pop` removes and returns the first element of a stack.
The state of the original stack is changed to reflect the result of the
operation. There is no need to create and return a new stack.

A stack is very easily implemented with a singly linked list. Items are
inserted and removed from the front. In figure
[fig:stack_push_pop](fig:stack_push_pop) the integers 7, 2 and 9 are
pushed onto the stack. Items are retrieved in the reverse order of their
insertion. The integers pushed onto the stack are popped from the front
and returned in the order 9, 2, 7. In this example, the whole process
mutates a single stack, which is explicitly depicted in the figure.

![Stack operations, push and
pop](../res/stack_push_pop.svg "stack_push_pop")

It is also possible to implement a stack as an array. Items are added
and removed from the rear. The rear position is calculated from the size
of the stack (the number of element in the stack). Accessing any element
in an array can be done in constant time. The stack implementation also
maintains the maximum stack size (size of the underlying array). If the
size of the stack is the allocated size of the array, the stack is
considered _full_. Pushing and further elements onto the stack will
result in a state known as _stack overflow_. A dynamic array stack
implementation can be used to avoid this condition.

![Stack implemented as an array](../res/stack_array.svg "stack_array")

## Queue

Unlike a stack, queue items are removed in the order they were
originally inserted, called a _First-In-First-Out (FIFO)_ or
_Last-In-Last-Out (LILO)_ data structure. Queues share a very similar
inductive definition to stacks, though their implementations differ.

- $\text{emptyqueue} () \rightarrow Q$
- $\text{push} (E,Q) \rightarrow Q$
- $\text{isemptyqueue} (S) \rightarrow T|F$
- $\text{top} (Q) \rightarrow E$
- $\text{pop} (Q) \rightarrow Q$

The role of `top` and `pop` are achieved through the mutator `dequeue`,
while `enqueue` performs an operation analogous to `push`, manipulating
an existing queue.

- $\text{enqueue} (E,Q)$
- $\text{dequeue} (Q) \rightarrow E$

For an efficient queue implementation, start and rear pointers must be
maintained. With these two references, items can be enqueued at either
the start or rear of the linked list in constant time. Items can only be
dequeued from the start of a linked list in constant time. To dequeue
from the rear, the rear pointer must be updated to point to the
penultimate (new rear) element. With a singly linked list, this requires
iteration from the start, $O(n)$ complexity. Therefore, the most
effective way to use a linked list to implement a queue is enqueue at
the rear and dequeue from the front, illustrated in figure
[fig:queue_enqueue_dequeue](fig:queue_enqueue_dequeue).

![Queue operations, enqueue and
dequeue](../res/queue_enqueue_dequeue.svg "queue_enqueue_dequeue")

A queue can be implemented as an array, with three additional variables:
`front`, `size` and `capacity`. So that the bounds of the array are not
exceeded, `front + size - 1 < capacity` must hold. As items are
dequeued, the front pointer is incremented and the number of available
slots decreases. It is possible that `front + size - 1` is equal to the
maximum capacity of the array, but most of the array is empty. The
simple solution to this problem is moving the occupied cells to the
beginning of the array, either when it is necessary or after each
dequeue operation. A slightly different implementation is preferable.

As successive enqueue and dequeue operations are conducted the occupied
portion of the queue shifts along the allocated space of the array. When
the rear element is at index `capacity -1`, adding an element to the
queue places it at index `0`, the queue wraps on the boundary. Now the
array only becomes full when the size of the queue is equal to the
capacity of the array. In a circular array, a queue occupies the
indices:

- `front, ..., front + size - 1` if `front + size - 1 < capacity`
- `front, ..., capacity - 1` and `0, .., front + size - capacity - 1` if
  `front + size > capacity`

In figure [fig:circular_queue](fig:circular_queue), a queue of size
three occupies different portions of the array. The front pointer is
indicated with an arrow.

![Queue implemented as a circular
array](../res/circular_array.svg "circular_queue")

An example implementation of a queue with a circular array contains four
functions, two conditionals `isemptyqueue` and `isfullqueue`, a
constructor `enqueue` (emptyqueue is omitted here) and a selector
`dequeue`.

<div>

[Circular queue implementation]{.label}

```{.text}
record E { ... };
record Q {
    int size;
    int capacity;
    E[] arr;
};
isemptyqueue(Q:q) -> T|F {
    return q.size == 0;
}
isfullqueue(Q:q) -> T|F {
    return q.size == q.capacity;
}
enqueue(E:e, Q:q) {
    if (isfullqueue(q)) THROW ERROR;
    q.arr[(q.front + q.size++) mod q.capacity] = e;
}
dequeue(Q:q) -> E:e {
    if (isemptyqueue(Q)) THROW ERROR;
    E e = q.arr[q.front];
    q.front = q.front + 1 mod q.capacity;
    q.size--;
    return e;
}
```

</div>
