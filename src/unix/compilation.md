---
author: Alex Neville
date: 2023-06-25
title: Program Compilation
---

The compilation of a C source file into a native executable is more
accurately called a _build_, in which compilation is one step. A command
line utility such as GCC is able to perform all of the necessary steps
to transform a plain text C source file into a native executable. The
GCC manual page makes this clear:

> When you invoke GCC, it normally does preprocessing, compilation,
> assembly and linking. The "overall options" allow you to stop this
> process at an intermediate stage.

When GCC is invoked with the path to a C source file, it will attempt to
produce an executable, unless it is passed optional flags to change the
default behaviour. The Build can be interrupted at any of three stages
(besides full compilation):

- `-E`: Run preprocessor only, do not compile.
- `-S`: Compile (proper) only, do not assemble.
- `-c`: Assemble only, do not link.

Similarly, GCC can start from any point in this process. GCC makes use
of an input file's extension to determine the action(s) to perform. Some
examples:

- `.c`: C source code that must be preprocessed.
- `.i`: C source code that should not be preprocessed.
- `.s`: Assembler code.

Many more exist. Equivalent extensions exist for C++ programs. Any file
with an unrecognised extension is treated as an object file. GCC chooses
`.o` as the default extension when creating an object file.

The language can also be set explicitly with the `-x` flag. Values
include:

```{.language-plaintext}
c  c-header  cpp-output
assembler  assembler-with-cpp
```

As an example, a C source file might be preprocessed and compiled with
the command `gcc -S main.c` and subsequently assembled and linked with
the command `gcc -x assembler main.s` or simply `gcc main.s` (GCC can
detect the type of input file from the suffix).

## Preprocessor

Lines beginning with `#` are treated as preprocessor directives. These
lines are expanded and text replacements occur before the file is
compiled.

The minimal C program, shown below, does not include any preprocessor
directives. GCC will return an identical file if instructed to perform
preprocessing the file; files that do not require any preprocessor
treatment are skipped.

```c
int main(int argc, char *argv[])
{
    return 0;
}
```

Comments and macros are replaced in this step. To stop compilation at
the preprocessor stage, use the `-E` flag. Optionally use the `-P` flag
to prevent _linemarkers_ appearing in the output. By default,
preprocessed programs are written to standard output. This can be
redirected to a file with `-o`.

```c
// main.c
#define EXIT_CODE 0

int main(int argc, char *argv[])
{
    // comments are removed by the preprocessor
    return EXIT_CODE;
}
```

The preprocessed version of the program above, via `gcc -P -E main.c` or
directly with `cpp -P main.c`:

```c
int main(int argc, char *argv[])
{
    return 0;
}
```

The default extension for C programs that do not need to be preprocessed
is `.i`. Changing the suffix of `main.c` from `.c` to `.i` will cause
the compiler to encounter an error, as it will skip the preprocessor
step and the macro `EXIT_CODE` will not be replaced.

```{.language-plaintext}
$ cp main.c main.i
$ gcc main.i
main.i: In function ‘main’:
main.i:6:12: error: ‘EXIT_CODE’ undeclared (first use in this function)
    6 |     return EXIT_CODE;
      |            ^~~~~~~~~
main.i:6:12: note: each undeclared identifier is reported only once for each function it appears in
$
```

To force the compiler to start at the preprocessor step, regardless of
the file extension, set the language to `c` explicitly with the `-x`
flag (e.g. `gcc -x c main.i`). Using the appropriate extension for each
file is unsurprisingly considered best practice.

## Compiler

GCC refers to the compilation step as _compilation proper_ to avoid
confusion this step with the whole build process. Compilation transforms
preprocessed C source code into assembly. The `-S` flag instructs GCC to
stop at the assembly step, after compilation (proper).

```{.language-plaintext}
$ ls
main.c
$ gcc -S main.c
$ ls
main.c  main.s
$
```

This creates a new file with the `.s` suffix.

```asm {.gnuassembler .s}
	.file	"main.c"
	.text
	.globl	main
	.type	main, @function
main:
.LFB0:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	movl	%edi, -4(%rbp)
	movq	%rsi, -16(%rbp)
	movl	$0, %eax
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	main, .-main
	.ident	"GCC: (GNU) 13.1.1 20230429"
	.section	.note.GNU-stack,"",@progbits
```

To compile a file on which the preprocessor has been run, use the
`-x cpp-output` or give it the `.i` suffix, in addition to the `-S`
option. It is safe to run the preprocessor on the same f once.

## Assembler

Compilation produces an architecture dependent assembly file. GCC uses
the GNU `as` assembler to produce object files. GCC will identify any
file ending with `.s` as assembly. Alternatively, the option
`-x assembler` will explicitly set the file type to assembly.

```{.language-plaintext}
$ ls
main.c  main.s
$ as -o main.o main.s
$ ls
main.c  main.o  main.s
```

## Linker

The final step in the build process is linking. At this point any
library dependencies are resolved. GCC with no arguments will attempt to
link the specified files, by delegating to _ld_ or another linker
program. Running GCC with the `-v` flag will output the link command
used. For example `gcc -c main.o -o main`, uses the following linker
command:

```{.language-plaintext}
/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/collect2 -plugin
/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/liblto_plugin.so
-plugin-opt=/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/lto-wrapper
-plugin-opt=-fresolution=/tmp/ccB9TXNn.res
-plugin-opt=-pass-through=-lgcc -plugin-opt=-pass-through=-lgcc_s
-plugin-opt=-pass-through=-lc -plugin-opt=-pass-through=-lgcc
-plugin-opt=-pass-through=-lgcc_s --build-id --eh-frame-hdr
--hash-style=gnu -m elf_x86_64 -dynamic-linker
/lib64/ld-linux-x86-64.so.2 -pie -o main
/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/../../../../lib/Scrt1.o
/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/../../../../lib/crti.o
/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/crtbeginS.o
-L/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1
-L/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/../../../../lib -L/lib/../lib
-L/usr/lib/../lib -L/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/../../..
main.o -lgcc --push-state --as-needed -lgcc_s --pop-state -lc -lgcc
--push-state --as-needed -lgcc_s --pop-state
/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/crtendS.o
/usr/lib/gcc/x86_64-pc-linux-gnu/13.1.1/../../../../lib/crtn.o
```
