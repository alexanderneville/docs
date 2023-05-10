If $A_1, A_2, \ldots, A_n$ is a list of $n$ sets and $R$ is a subset of
$A_1 \times A_2 \times \ldots \times A_n$, then $R$ is a *n-ary
Relation*. Elements of $A_1 \times A_2 \times \ldots \times A_n$ are all
*n-tuples*. Any subset $R$ is a relation. A relation can be represented
as a set of ordered *n-tuples* in tabular or graphical form or using
set-builder notation.

Binary Relations
================

A binary relation associates elements of one set, the *domain*, to
another set, the *codomain*. A binary relation over the sets $X$ and $Y$
is a subset of $\mathcal{P}(X \times Y)$. A binary relation is
*homogeneous* when $X = Y$ and is said to be a binary relation over $X$.
$(x, y) \in R$ means that $x$ is related to $y$, sometimes written
$xRy$. A binary relation is a generalisation of a *unary* function which
maps one input to one output.

The composition of the relation $R \subseteq A \times B$ and
$S \subseteq B \times C$ is written $S \circ R \subseteq = A \times C$;
$R$ is applied first and then $S$.

$$S \circ R = \{(a,c) \text{ } | \text{ } \exists b \in B. (a,b) \in R \land (b,c) \in S \}$$

If $R \subseteq A \times B$, then $R^\circ \subseteq B \times A$.
$R^\circ$, $R^{-1}$ or $R^T$ is called the *converse*, *inverse* or
*transpose* relation of $R$.

$$yR^\circ x \iff xRy$$
$$R^\circ = \{(y, x) \in B \times A | (x, y) \in R\}$$

Functions
=========

A function is a type of binary relation which maps every element of the
domain to exactly one element of the codomain. For a relation
$R \subseteq A \times B$, $R$ must satisfy two conditions if it is a
*functional relation*.

1.  **Total:** For every element $a \in A$, there must exist an ordered
    pair in $R$ where $a$ is the first element.

    $$\forall a \in A \exists b \in B . (a, b) \in R$$

2.  **Single-valued:** For every element $a \in A$, there is only one
    value $b \in B$ such that $(a,b) \in R$. There is only one output
    for each element in the domain.

    $$\forall a \in A \forall b,c \in B. (a,b) \in R \land (a,c) \in R \implies b=c$$

If $f \subseteq A \times B$ is a function or *functional relation*, its
*domain* is $A$ and its *co-domain* is $B$. The set of all possible
outcomes of a function is a subset of its co-domain, called the *range*
of $f$.

$$\{b \in B \text{ } | \text{ } \exists a\in A. (a,b) \in f\}$$

A relation is not a function if there exists an element in the domain
which has multiple values in the co-domain, or if any of the elements in
the domain have no value in the co-domain, as in figure
[fig:not\_functional\_relation](fig:not_functional_relation)

![Two non-functional
relations](../res/invalid_functions.svg "not_functional_relation")

Instead of using the notation $f \subseteq A \times B$ to write the
domain and co-domain of a functional relation the notation
$f: A \mapsto B$ is preferred. Instead of writing $(a, b) \in f$, the
notation $f(a) = b$ is used to say $a$ maps to $b$.

If $f : A \mapsto B$, $b \in B$ is the *image* of **element** $a \in A$,
and $a$ is the *pre-image* of $b$. The term *image* may also refer to a
subset $X$ of the domain $A$, in which case the *image* is the set of
outputs of $f$ applied to elements of $X$, written $f[X]$. Using this
notation the *image* of the whole domain, the range of $f$, is written
$f[A]$ ($A \subseteq A$).

$$f[X] \stackrel{\text{def}}{=} \{b \in B \text{ } | \text{ } \exists x \in X. f(x) = b \}$$

The *reverse image* of a subset $Y$ of the co-domain is denoted
$f^{-1}[Y]$

$$f^{-1}[Y] \stackrel{\text{def}}{=} \{a \in A\text{ } | \text{ } f(a) \in Y\}$$

There are several different properties a function may satisfy,
illustrated in figure
[fig:functional\_relations](fig:functional_relations).

![Set of valid functions](../res/functions.svg "functional_relations")

1.  General function: defined and single-valued for each element of A.
    The *many-to-one* property is valid for a general function. There
    may be elements of the co-domain without a pre-image in $A$.

2.  Injective (not surjective) function: no two elements of $B$ have the
    same pre-image in $A$, a form of *one-to-one* function; no two
    elements of $A$ share the same image.

    $$\forall x,y \in A.x \neq y \implies f(x) \neq f(y)$$
    $$\forall x,y \in A.f(x) = f(y) \implies x=y$$

3.  Surjective (not injective) function: the range of the function is
    the entire co-domain. Every element of $B$ has a pre-image in $A$.
    If a function is surjective, the cardinality of $A$ is less than or
    equal to the cardinality of $B$, $|A| \le |B|$.

    $$\forall b\in B \exists a \in A. f(a) = b$$

4.  Bijective function: both injective and surjective, the domain and
    co-domain have equal cardinality $|A| = |B|$.

Endorelations
=============

A binary relation $R$ from a set $A$ to itself is called an
*endorelation* on $A$, $R \subseteq A \times A$. A function from $A$ to
$A$ is called an *endofunction*. A binary relation may have some
additional special properties.

-   **Reflexivity:** A binary relation is *reflexive* if every element
    of the set is related to itself.

    $$\forall x \in A. (x,x) \in R$$

-   **Irreflexivity:** A binary relation is *irreflexive* if every
    element of the set is not related to itself.

    $$\forall x \in A. (x,x) \notin R$$

-   **Symmetry:** A binary relation is *symmetric* if for all elements
    $x$ and $y$ in $A$ if $x$ is related to $y$ then $y$ is related to
    $x$.

    $$\forall x,y \in A. (x,y) \in R \implies (y,x) \in R$$

-   **Antisymmetry:** A binary relation is *antisymmetric* if for all
    elements $x$ and $y$ in $A$ if $x$ is related to $y$ then $x = y$.

    $$\forall x,y \in A. (x,y) \in R \land (y,x) \in R \implies y = x$$

-   **Asymmetry:** A binary relation is *asymmetric* if it is both
    antisymmetric and irreflexive.

    $$\forall x,y \in A . (x,y) \in R \implies (y,x) \notin R$$

-   **Transitive:** A binary relation is *transitive* if for all
    elements $x$, $y$ and $z$ in $A$ if $x$ is related to $y$ and $y$ is
    related to $z$, then $x$ is related to $z$.

    $$\forall x,y,z \in A. (x,y) \in R \land (y,z) \in R\implies (x,z) \in R$$

Equivalence Relations
=====================

An *equivalence relation* is *reflexive*, *symmetric* and *transitive*.
The symbols $\approx$ and $\equiv$ are often used to denote equivalence
relations. If a set $A$ is equipped with an equivalence relation, every
element of $A$ has an *equivalence class*, the set of elements
equivalent to it. The equivalence class of $x$ is written $[x]_\equiv$.

$$[x]_\equiv \stackrel{\text{def}}{=} \{y \in A \text{ }| \text { } x \equiv y\}$$

An element always belongs to the equivalence class containing itself
$x \in [x]_\equiv$. If $x \equiv y$ then $[x]_\equiv =[y]_\equiv$. If
$x \not\equiv y$ then $[x]_\equiv \cap [y]_\equiv = \emptyset$, any two
equivalence classes are fully disjoint.

An equivalence relation forms a *classification* of elements of $A$; $A$
is decomposed into subsets. The set of all equivalence classes is
$A/\equiv$. These classes are all disjoint, no element can be in more
than one equivalence class and each element is in some equivalence
class, the set $A$ is fully covered by $A/ \equiv$.

For a function $f: A \mapsto B$, which is not injective, its *kernel* is
the equivalence relation on $A$ which relates two elements with the same
image in $B$ under $f$, written $\text{ker}(f)$. Therefore the set of
equivalence classes $A / \text{ker}(f)$ corresponds to the range of $f$.
