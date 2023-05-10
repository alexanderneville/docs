_Artificial intelligence_ is the study or creation of machine algorithms
which may make observations and inferences in order to perform
actionable decision making, as a human or animal might. In wider society
_Machine learning_ and AI are two often conflated terms. ML is generally
considered to be a specific discipline of AI, concerned with improving
an algorithm\'s performance using past experience. This is not an
article about ML.

# Philosophy of AI

There is not a universal consensus on definition of AI (which is a
relatively ambiguous term), an issue revolving around the meaning of
_intelligence_. It could be argued that the explicit goal of artificial
intelligence is to simulate human performance. If a more abstract form
of intelligence - artificial or otherwise - is adopted, then AI is not
required to simulate human performance at all. Philosophy and logic
attempt to codify the laws of thought; rationality and correct reasoning
according to these rules could be achieved by a human or artificially by
a machine. In some cases intelligence is said to be an internal
property, as in a thought process or the reasoning employed, while in
others it is evidenced in outward behaviour. These two conditions form
four common interpretations of AI:

- Thinking as a human.
- Acting as a human.
- Thinking rationally.
- Acting rationally.

The _Turing test_ is passed if a human evaluator is unable to tell apart
a human and AI algorithm through interrogation. The effectiveness, or
outward intelligence, of the algorithm is measured by its ability to
generate human like responses (its behaviour), independent of the
underlying thought process. Many academics additionally agree that the
most pragmatic approach to AI is not simulating the human thought
process directly. The commonly cited analogy is that _artificial flight_
was not achieved by imitating the flight of birds exactly (Russell &
Norvig (2021)). Thus, artificial intelligence is widely agreed to be the
study and creation of algorithms capable of _acting rationally_, or
working to reach the best possible outcome. Sometimes this is called the
_standard model_ for AI.

# Agents

An _agent_ is an entity, of any type, capable of observing its
_environment_ and acting upon it. The concept of an agent is not strict,
it is just a method of introspection or analysis of a system. An
agent\'s methods of perceiving its environment are called _sensors_,
while its methods of interacting with its environment are called
_actuators_. Just like an agent itself, the environment of an agent
could be anything. The environment is usually limited to the _thing_
that an agent perceives or acts upon.

As an example a person\'s environment is the Earth; their sensors
include eyes and ears and their actuators include limbs and digits. A
machine might have cameras, microphones and thermometers as sensors and
a collection of motors as actuators, acting within the environment of a
warehouse. A computer program has sensors and actuators in the form of
common IO interfaces, operating on a computer file system as its
environment.

The term _percept_ is the information an agent\'s sensors are currently
perceiving, while an agent\'s _percept sequence_ is the history of all
the information the agent has perceived. The behaviour of an agent is
given by the _agent function_ which maps all possible percept sequences
(an infinite list) to an action, an example of a
[mathematical function](../maths/set_theory.org::*Functions). The binary
relation which constitutes the agent function is an external model of an
agent\'s behaviour. The action taken by an agent at any point is
determined by a concrete _agent program_, rather than a mathematical
model. An agent program typically takes the current percept as an
argument and returns an action.

## Rationality

In order to exhibit intelligence, an agent must attempt to make the
correct decision. The performance of an agent is evaluated by a
_performance measure_. A rational agent selects the action expected to
maximise its performance measure over a sequence of actions and states.
An _omniscient_ agent knows the exact outcome of its actions, there is
no uncertainty in its behaviour. A rational agent will not perform
perfectly, but in most cases it should perform well.

## Agent Structure

Simple reflex agents respond directly to the current percept, regardless
of state of the percept sequence. Theses agents struggle in partially
(un)observable environments, often becoming stuck in an infinite loop.
Sometimes randomisation is used to break these loops, but this type of
agent is fundamentally unable to maintain its own understanding of the
environment.

    FUNCTION simple-reflex-agent(percept) -> action:
      STATIC rules;
      state <- interpret(percept);
      action <- lookup-action(state, rules);
      RETURN action;

![The structure of a reflex
agent](../res/simple-reflex-agent.svg "simple-reflex-agent")

### Models and Goals

_Model-based_ reflex agents maintain internal state and a model of its
interaction with the environment, facilitating rational behaviour in
only partially observable environments. The agent\'s representation of
the environment is derived from the agent\'s _sensor model_, how its
percept represents the state of the environment, and its _transition
model_ - the effect observed in the environment by an action of the
agent.

    FUNCTION model-based-reflex-agent(percept) -> action:
      STATIC rules, state, last-action transition-model, sensor-model;
      state <- interpret(state, last-action,
                         percept,
                 transition-model,
                 sensor-model);
      action <- lookup-action(state, rules);
      RETURN action;

![The structure of a model-based
agent](../res/model-based-reflex-agent.svg "model-based-agent")

Basic reflex agents implement a form of _if-then_ behaviour, dictated by
the rules that relate the agent\'s current understanding of the
environment with actions. Model-based agents extend the capabilities of
simple reflex agents by maintaining an internal representation of the
wider environment and having some understanding of how its percepts and
actions represent or affect the environment. _Goal-based_ agents further
extend the structure of model-based agents by requiring information
about desirable _goal_ states. These agents combine the transition model
with the current state to select actions which achieve the chosen goal.

![The structure of a goal-based
agent](../res/goal-based-model-based-agent.svg "model-based-agent")

An agent\'s _utility function_ is an internalisation of the performance
measure. While many action sequences may satisfy a goal, utility-based
agents seek to maximise their utility function and hence performance
measure (optimisation). Utility-based agents have some internal sense of
what the performance measure is, though this is not required for an
agent to be rational. In very simple scenarios, rational behaviour can
be programmed into a reflex agent in the form condition-action rules.
More complex agents are generally more flexible and have the ability to
learn and improve their performance. In each state a utility-based agent
is able to assess the desirability of a state resulting from an action
in the current state, using its utility function.

![The structure of a Utility-based
agent](../res/utility-based-model-based-agent.svg "model-based-agent")

### Learning Agents

In all cases seen so far, an agent selects actions under certain
conditions. This model does not explain how an agent is constructed.
Simple agents may be programmed explicitly to behave rationally. Another
strategy for creating agents is through _learning_. Learning agents are
divided into the _learning element_ and _performance element_, which
dictates the actions the agent chooses as before. The learning element
determines how the state and models of the performance element are
modified.

### State Representation

Depending on the complexity of the problem, the representation of the
current state varies. In the most simple case, the state is represented
_atomically_ - there is no internal structure of the state, it is not
composed of many variables. The only property of the state is its
relationship with other states. Increasing in complexity, a _factored
representation_ divides each state into a set of variables with values.
Being in such a state is a consequence of all these values combined, a
change to one or more of them will result in a different state.
_Structured representations_ are more complicated again, incorporating
objects and relationships between them, rather than just a set of
individual properties.

## Task Environment

The environment of an agent is the space in which it perceives and
operates. The _task environment_ of an agent is the \"problem\" which it
is designed to solve. The task environment is composed of the
performance measure, the environment itself and the agent\'s sensors and
actuators. The task environment and hence the required agent can be
categorised in a few key ways:

- The environment of an agent may be _fully_ or _partially observable_,
  or even completely _unobservable_, to an agent\'s sensors in a single
  percept.
- An environment is _deterministic_ if the subsequent state of the
  environment is entirely determined by the current state and the action
  of the agent; this is not the case in a _stochastic_ or
  _nondeterministic_ environment.
- In an _episodic_ environment the selected action is determined by a
  single (the current) percept, not any previous information, and the
  selected action will not affect subsequent actions. If an agent\'s
  actions affect future decisions, the environment is sequential.
- A _static_ environment does not change between actions. A _dynamic_
  environment changes constantly and the agent defaults to the action of
  nothing, except when it explicitly makes a decision. A _semidynamic_
  environment does not change constantly, but the performance of an
  agent decreases with time.
- The usual meanings of _continuous_ and _discrete_ hold with respect to
  the state of the environment, time and the percepts and actions of the
  agent.
- A task environment may be completely or partially _known_ or _unknown_
  to the agent. Any component of the task environment, including even
  the performance measure, could be unknown to the agent,
  differentiating this property from the environments
  deterministic/nondeterministic nature.
