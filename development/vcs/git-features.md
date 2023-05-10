Tags
====

Create a lightweight tag without an annotation:

``` {.text}
$ git tag v1.0
$ git tag
v1.0
$ git show v1.0
commit 2c35a17e92118e9c8b160438d0270af72f289ce3 (HEAD -> main, tag: v1.0)
Author: Alexander Neville <alexander.neville@icloud.com>
Date:   Tue Mar 28 15:38:42 2023 +0100

    create README
```

Deleting a tag:

``` {.text}
$ git tag
v1.0
$ git tag -d v1.0
Deleted tag 'v1.0' (was 2c35a17)
$ git tag
```

Creating an annotated tag:

``` {.text}
$ git tag
$ git tag -a v1.1 -m "version 1.1 with CONTRIBUTING info"
$ git tag
v1.1
$ git show v1.1
tag v1.1
Tagger: Alexander Neville <alexander.neville@icloud.com>
Date:   Tue Mar 28 16:02:58 2023 +0100

version 1.1 with CONTRIBUTING info

commit f47ea70f45dc677673556040d3d2f0fc5ac452d0 (HEAD -> main, tag: v1.1)
Author: Alexander Neville <alexander.neville@icloud.com>
Date:   Tue Mar 28 15:57:50 2023 +0100

    create CONTRIBUTING
```

Creating a tag for a previous commit:

``` {.text}
$ git log --oneline
f47ea70 (HEAD -> main, tag: v1.1) create CONTRIBUTING
2c35a17 create README
$ git tag v1.0 2c35a17
$ git tag
v1.0
v1.1
$ git log --oneline
f47ea70 (HEAD -> main, tag: v1.1) create CONTRIBUTING
2c35a17 (tag: v1.0) create README
```

[TODO]{.todo .TODO} Remote Tags {#remote-tags}
-------------------------------

Aliases
=======

Short aliases for common commands can be defined by git itself, using
`git config`; these aliases can optionally be made global, with the
`--global` command. Sometimes even shorter shell aliases are preferred.
The git operation to perform is specified in quotes. External commands
are prefaced with a `!`.

``` {.text}
$ git config alias.unstage 'restore --staged'
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md

$ git unstage README.md
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

See also: [git setup](introduction.org::*Setup).
