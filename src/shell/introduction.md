---
author: Alex Neville
date: 2023-06-25
title: Shell Scripting
---

## Shebang

If a plain text file is executed as a command and the first line begins
`#!`, the remainder of the first line is treated as the _interpreter
directive_. The specified interpreter is passed the path of the executed
file as an argument. This simplifies the command line execution of a
script and obscures or abstracts details such as the intended
interpreter.

The interpreter specified in the directive may be a compiled executable
or another script following the same pattern.

Common examples include:

- `#!/bin/sh`
- `#!/bin/bash`
- `#!/usr/bin/env bash`

Very nearly every Unix system will make `/bin/sh` some POSIX compliant
shell. If a script requires certain features not present in posix sh, a
more explicit shebang should be selected. Some non-GNU systems will not
have bash installed and it is of no garuntee that bash is installed as
`/bin/bash`. Equally, the `env` program and its path are not universal.

To make a file executable add the appropriate permission. Run the newly
created executable by putting its path at the command line.

```sh
chmod u+x script.sh
./script.sh
```

## Variables

Shell variables may contain characters, strings of characters or
numbers. Variables are created when a value is assigned to a name.
Variable names may contain letters and the `_` symbol. Single `=` is
used for assignment. Variable names and values may not be space
seperated during assignment. Quotes are required to preserve whitespace
in strings.

```sh
letters=hello
words="hello    world"
number=5
echo $words
echo "$words"
```

To seperate a variable name from string contents, `${}` syntax is used.

```sh
firstWord="Hello"
greeting="${firstWord}, world!"
echo "$greeting"
```

The output of a command can be included in a string with _command
substituion_. `$()` is the prefered syntax, though double back-ticks
have the same effect.

```sh
echo "uptime: $(uptime)"
```

Variables are not declared before assignment or use. Attempting to use
the value of a variable that has not been assigned to results in the
empty string, not an error.

The following script is named `script.sh`.

```sh
#!/bin/sh
echo "variable value: $variable" #
variable="updated value"
echo "variable value: $variable" # updated value
```

Executing the script in an interactive shell will result in this output.

```
$ ./script.sh
variable value:
variable value: updated value
```

The value of `variable` in the script's output remains empty in the case
that `variable` is declared in the interactive shell before the
script is executed.

```
$ variable="initial value"
$ echo "variable"
variable
$ echo "$variable"
initial value
$ ./script.sh
variable value:
variable value: updated value
```

When the script is executed, a new shell is created according to the
processor directive. The value of `variable` is not set in this new
environment. To make the script inherit the value of a variable in the
parent process, the variable must be *exported*.

```
$ variable="initial value"
$ export variable
$ ./script.sh
variable value: initial value
variable value: updated value
$ echo "$variable"
initial value
```

Assignments to `variable` within the script are not reflected in the
parent process after the script terminates. If this behaviour is
desired the script should be *sourced* within the interactive shell.
`source` or `.` is the way this is acheived.

```
$ variable="initial value"
$ . ./script.sh
variable value: initial value
variable value: updated value
$ echo "$variable"
updated value
```

## Arguments

- `$#` is the number of arguments passed to the script.
- `$@` is a space delimeted string of all the aruments passed to the
  script
- `$0` is the name of the script

```sh
#!/bin/sh
echo "$0"
echo "$@"
```

## Arrays

Arrays are named in the same fashion as variables. An array is written
as a list of space-delimited values inside `()` brackets.

```sh
myArray=(Hello, "my name" is Alex)
echo ${myArray[@]}  # Hello, my name is Alex
echo ${myArray[1]}  # "my name"
echo ${#myArray[@]} # 4
```

## Arithmetic Operations

Use `$(())` syntax for arithmetic operations. The operators are as one
might expect.

```sh
a=3
b=$((a+5))
b=$(($a+5))
echo $b # 8
8
echo $(($b / 5)) # 1
echo $(($b % 5)) # 3
```

## String Operations

```sh
string="Hello, world!"
echo ${#string} # 13
echo ${string:0:5} # Hello
echo ${string:5} # , world!
```
