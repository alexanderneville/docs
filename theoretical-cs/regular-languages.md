A _regular language_ is a type of formal language that can defined by a
regular expression or automaton.

# Formal Language

A formal language is a (possibly infinite) set of _words_, whose
_letters_ belong to an _alphabet_ and are well-formed according to a set
of rules. A language\'s alphabet, written $\Sigma$, is a set of
_symbols_ or _tokens_ (sometimes the word letter is used). A word is a
string concatenation of letters of the alphabet. A formal language $L$
over an alphabet $\Sigma$ is a subset of the set of all lists of letters
of the alphabet, $L \subseteq \Sigma^{\ast}$.

# Regular Expression

A regular expression represents a regular language, by specifying a set
of valid strings. In theoretical computer science, a regular expression
is composed of a small number of _constants_ or _atoms_:

- Empty set $\varnothing$ or $0$ does not match any string, it does
  however represent a regular language.
- Empty string $\varepsilon$ matches the empty string, note that
  $\varepsilon \neq \varnothing$.
- Literal character $a \in \Sigma$ matches the word $a$.
- _Concatenation_ or _Juxtaposition_ $EF$ of regular expressions $E$ and
  $F$ matches the concatenation of a string matching $E$ and a second
  string matching $F$.
- _Alternation_ $E|F$ of regular expressions $E$ and $F$ matches any
  word matched by either $E$ or $F$.
- _Star_ or _Kleene Star_ $E^{\ast}$ matches the concatenation of zero
  or more words matched by the regular expression $E$.

The precedence of these constructs, from highest to lowest, is
concatenation, $|$ and then $\ast$. This is the minimal set of regular
expression constants, though some others do exist. Many _regular
expression engines_ implemented in software offer additional operators
beyond those listed here.

- $E^{+}$ matches 1 or more occurrence of a string matched by $E$, which
  is equivalent to $EE^{\ast}$.
- $E?$ matches 0 or 1 occurrences of a string matched by $E$, equivalent
  to $\varepsilon | E$.

# Automaton

A _finite state machine_ or _automaton_ (FSM/FSA) is a theoretical
module of computation. For an automaton to be considered finite, it must
have a finite set of states. An automaton exists in exactly one state at
any moment. An automaton moves between states by _transitioning_
according to an input.

A deterministic finite automaton $F$ can be represented as a tuple
$(\Sigma, S, s_{0}, \delta,  A)$, containing:

- Input alphabet $\Sigma$.
- Finite, non-empty set of states $S$.
- Initial state $s_{0} \in S$.
- State transition function $\delta : S \times \Sigma \rightarrow S$.
- A set of accepting states $A \subseteq S$.

A Nondeterministic finite automaton

- Input alphabet $\Sigma$.
- Finite, non-empty set of states $S$.
- Initial state $s_{0} \in S$.
- State transition function
  $\delta : S \times \Sigma \rightarrow \mathcal{P}(S)$.
- A set of accepting states $A \subseteq S$.

# Finite State Machine

# Kleene\'s Theorem
