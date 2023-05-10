A *set* is a collection of different items; a set contains *elements*. A
set can be simply expressed by enumerating its elements, typically
inside $\{$,$\}$ curly brackets. $\{2,4,6,8\}$ and
$\{\text{Alex}, \text{Benjamin}, \text{Richard}, \text{Bethan}\}$ are
examples of sets.

Membership & Equality
=====================

The symbol $\in$ denotes set membership, so if $x$ is a member of set
$A$ this can be written $x \in A$. The notation $x \notin A$ means that
$x$ is not an element of $A$. Two sets are equal when they contain the
same elements, formally:

$$ A = B \iff (\forall x.x \in A \iff x \in B)$$

Subsets
=======

A set $B$ is a *subset* of another set $A$, written $B \subseteq A$, if
all the elements of $B$ are also elements of $A$.

$$ B \subseteq A \iff (\forall x.x \in B \implies x \in A)$$

Any set is a subset of itself $A \subseteq A$. If $B \subseteq A$ and
$A \neq B$, then $B$ is a *proper subset* of $A$, written $B \subset A$.

$$ B \subset A \iff (\forall x.x \in B \implies x \in A) \land \neg (A = B)$$

Two sets are equal if and only if they are subsets of each other.

$$ A = B \iff (A \subseteq B \land B \subseteq A)$$

Set Operations
==============

Some common set operations:

-   $A \cup B$ is the *union* of two sets, containing all the elements
    occurring in $A$ or $B$ or both.
-   $A \cap B$ is the *intersection* of two sets, containing all the
    elements occurring in both $A$ and $B$.
-   $A \setminus B$ is the *difference* of two sets, containing all the
    elements occurring in $B$ but not $A$.

Set Cardinality
===============

Every finite set $A$ has a natural number *cardinality* $|A|$, its size
or number of elements. The empty set is written $\emptyset$ or $\{\}$
and has a cardinality of $0$. $\{\emptyset\}$ is not the empty set, as
$1 \neq \{1\}$ it is the *singleton* set, with cardinality $1$.

Set Builder Notation
====================

Enumeration of a subset\'s elements is inconvenient for large subsets. A
subset can be constructing concisely by selecting items from another set
according to logical conditions in *set-builder notation*. The $|$
symbol is read *\"such that\"*.

$$\{n \in \mathbb{N} \text{ } |  \text{ }n \ge 10\} = \{10, 11, 12, \ldots\}$$
$$\{n^2 \text{ } |  \text{ } n\in \mathbb{N}, n^3 \ge 8\} = \{4, 9, 25, \ldots\}$$

Product of Sets
===============

A *tuple* is a finite, ordered sequence of elements. An *ordered pair*
is a *2-tuple*, while an *ordered triple* is a *3-tuple*, in general an
*n-tuple* has $n$ elements. The ordered pair $(a, b)$ does not equal
$(b,a)$ unless $a=b$; order matters surprisingly. The product of two
sets is the set of all ordered pairs.

$$A \times B \stackrel{\text{def}}{=} \{(x,y) | x \in A, y \in B\}$$

Every lists of sets has a product. The product of $\emptyset$ is
$\{()\}$.

$$A \times B \times C \stackrel{\text{def}}{=} \{(x,y,z) | x \in A, y \in B, z \in C\}$$

Special Sets
============

-   $A^\ast$ is the set of all (finite) lists of elements of $A$.
-   $A ^\omega$ is the set of all *streams* (infinite sequences) of
    elements of $A$.
-   $\mathcal{P}A$ is the *powerset* (set of all subsets) of $A$.

Subset Algebra
==============

For any set $S$, $\mathcal{P}S$ is the set of all subsets of $S$. If $A$
and $B$ are elements of $\mathcal{P}S$ they are both subsets of $S$,
called the common or *ambient* set. Operations on $A$ and $B$ include
$A \cup B$ and $A \cap B$ and also the *complement* of $A$ relative to
$S$, written $\overline{A}$.

$$\overline{A} \stackrel{\text{def}}{=} S \setminus A$$

The axioms that these operations have:

-   Identity elements: $A \cup \emptyset = A$, $A \cap S = A$
-   Absorbing elements: $A \cup S = S$, $A\cap \emptyset = \emptyset$
-   Commutativity: $A \cup B$, $A \cap B$
-   Associativity: $A \cup (B \cup C) = (A \cup B) \cup C$,
    $A \cap (B \cap C) = (A \cap B) \cap C$
-   Idempotence: $A \cup A = A$, $B \cap B = B$
-   Absorption: $(A \cup B) \cap B = B$, $(A \cap B) \cup B = B$
-   Distributivity: $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$
-   Distributivity: $A \cup (B \cap C) = (A \cap B) \cup (A \cap C)$
-   Complements: $\overline{A} \cup A = S$,
    $\overline{A} \cap A = \emptyset$

Any set equipped with the operations $\land$, $\lor$, $\neg$ and two
constants $\top$ and $\bot$ forms a boolean algebra. Every power set
forms a boolean algebra assigning $\emptyset = \bot$ and the ambient set
$S = \top$.

-   Identity elements: $A \lor \bot = A$, $A \land \top = A$
-   Absorbing elements: $A \lor \top = \top$, $A\land \bot = \bot$
-   Commutativity: $A \lor B$, $A \land B$
-   Associativity: $A \lor (B \lor C) = (A \lor B) \lor C$,
    $A \land (B \land C) = (A \land B) \land C$
-   Idempotence: $A \lor A = A$, $B \land B = B$
-   Absorption: $(A \lor B) \land B = B$, $(A \land B) \lor B = B$
-   Distributivity: $A \land (B \lor C) = (A \land B) \lor (A \land C)$
-   Distributivity: $A \lor (B \land C) = (A \land B) \lor (A \land C)$
-   Complements: $\overline{A} \lor A = \top$,
    $\overline{A} \land A = \bot$
