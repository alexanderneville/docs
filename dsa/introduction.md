There is an important distinction between the abstract, theoretical
nature of algorithms and real-world computer programs. The same is true
of the relationship between *concrete data structures* and *abstract
data types*.

Algorithms
==========

If a computer is to execute the steps of an algorithm, the algorithm in
question must be *implemented* in a computer program. Programs are
written in formal languages, which are inherently more detailed and
precise than an algorithm and conform an exact syntax as understood by a
compiler. Algorithms provide abstraction from the implementation details
of programming, making it possible to describe and reason about problems
more easily.

The more abstraction with which an algorithm is defined, the more
ambiguous it becomes. It can be difficult to understand several critical
and non-critical aspects of an algorithm expressed in a few English
sentences. For example, the relationship between input and output and
its structure, known as the algorithm's specification may be largely
undefined for such an algorithm. For computer science applications,
pseudocode is often used as an abstract method for describing algorithms
in a way that preserves some focus on the implementation and conveys
more detail.

Data Types and Structures
=========================

In computer programming, a data type is a set of possible values and
supported operations for a given piece of data. Many languages include a
type system, which ensures a type is associated with each term or
variable within a program. A language's syntax may feature explicit type
annotations, where each variable is labelled with a type, while variable
types may be implicitly typed in others. A primitive data type is
provided by the language implementation. The primitive types of one
language may be similar or dissimilar to those of another. Primitive
types may also be referred to as atomic, basic, fundamental or built-in.
All other types, including data structures (which are types) are said to
be user-defined.

An Abstract Data Type is defined more loosely by the set of supported
operations on it, or in other words its interface, rather than its
implementation. An ADT is not concerned with the representation of data
and the only information learnt from an ADT specification is the set of
operations made available (public). This is called information hiding or
encapsulation, an important principle in programming. Concrete data
structures implement abstract data types.

Confusingly, there isn't a single standard or specification for any
given abstract data type and the functions it should expose; there
exists many different ways to define an ADT. For any abstract data type
that can be conceived, its specification should contain the minimal set
of operations or functions on it, from which all other operations on the
type can be derived. Any additional functions are redundant if they can
be implemented with the existing parts of the ADT. Highly abstract
mathematical type definitions borrow heavily from the techniques of the
functional programming paradigm, revealing very little indeed about ADT
implementation. Such inductive approaches to abstract type definition
are more correct in the mathematical sense, at the cost of being less
useful types in programming. Languages such as Java provide very
different, more substantial ADT definitions.