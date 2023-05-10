# Viewing the Commit History

Reviewing the history of a project is possible with the `git log`
command. By default, the log command will print a list of commits in
reverse order (most recent first).

```{.text}
$ git log
commit 06a00edd58d65bcee1d70b0cb45a8acdc0543cd1
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:34:14 2023 +0000

    change LICENSE

commit 16b89b1410d919818f9e5dab4eaab35872dac21a
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:33:45 2023 +0000

    modify README

commit 1c19a4b51dff6a0faf02d413289d782c33fe5227
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:32:25 2023 +0000

    Add license

commit efbb720533e1086398676db9d744455abb635e45
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:31:16 2023 +0000

    initial commit
```

## Log Options

There are, unsurprisingly, many options for controlling the output
format of `git log`. Some useful examples are listed below (their
purpose can be looked up using [git\'s own help
interface](introduction.org::\*Command Line Help)).

- `--patch`
- `--stat`
- `--shortstat`
- `--graph`
- `--name-only`
- `--name-status`
- `--pretty`

Other options filter or limit the commits that are displayed. The option
`-<n>`, where `n` is an integer, will return the `n` most recent
commits. The option `-S <string>` will only return commits in which the
specified string was changed. `--grep <pattern>` works similarly,
selecting commits with a message that matches the specified pattern. A
path may be specified as the last argument, sometimes preceded by two
dashes `--`, limiting commits to those that modified that file.

## Examples

Print the commits in which changes include the string `GPL`.

```{.text}
$ git log -S GPL
commit 06a00edd58d65bcee1d70b0cb45a8acdc0543cd1 (HEAD -> main)
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:34:14 2023 +0000

    change LICENSE

commit 1c19a4b51dff6a0faf02d413289d782c33fe5227
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:32:25 2023 +0000

    Add license
```

This slightly redundant command prints the name and status of the
changed files, limited to the commits affecting the `README`.

```{.text}
$ git log --oneline --name-status -- README.md
16b89b1 modify README
M       README.md
efbb720 initial commit
A       README.md
```

This command prints a summary of the committed changes where the message
contains the string `"license"` (case insensitive).

```{.text}
$ git log --grep="LICENSE\|license" --stat
commit 06a00edd58d65bcee1d70b0cb45a8acdc0543cd1 (HEAD -> main)
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:34:14 2023 +0000

    change LICENSE

 LICENSE | 27 ++++++++++++++++-----------
 1 file changed, 16 insertions(+), 11 deletions(-)

commit 1c19a4b51dff6a0faf02d413289d782c33fe5227
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:32:25 2023 +0000

    Add license

 LICENSE | 16 ++++++++++++++++
 1 file changed, 16 insertions(+)
```

## Amending a Commit

Using the `--amend` option it is possible to modify the last commit. If
there are staged changes, only the commit message is changed.

```{.text}
$ git log --oneline -1
06a00ed (HEAD -> main) change LICENSE
$ git commit --amend -m "modify LICENSE"
[main 62d7f45] modify LICENSE
 Date: Wed Mar 15 14:34:14 2023 +0000
 1 file changed, 16 insertions(+), 11 deletions(-)
$ git log --oneline -1
62d7f45 (HEAD -> main) modify LICENSE
```

If a change was accidentally omitted from a commit, it can be staged and
then added to the last commit via the same method.

```{.text}
$ git log -1 --stat
commit 06a00edd58d65bcee1d70b0cb45a8acdc0543cd1 (HEAD -> main)
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:34:14 2023 +0000

    change LICENSE

 LICENSE | 27 ++++++++++++++++-----------
 1 file changed, 16 insertions(+), 11 deletions(-)
$ git add CONTRIBUTING.md
$ git commit --amend -m "LICENCE and CONTRIBUTING info"
$ git log -1 --stat
commit b18d694dae570093b428c13b003d6a3785a8b628 (HEAD -> main)
Author: Alexander Neville <dev@alexneville.co.uk>
Date:   Wed Mar 15 14:34:14 2023 +0000

    LICENCE and CONTRIBUTING info

 CONTRIBUTING.md |  4 ++++
 LICENSE         | 27 ++++++++++++++++-----------
 2 files changed, 20 insertions(+), 11 deletions(-)
```

### Reverting Changes

There are multiple ways to remove changes from the index. Traditionally,
a `reset` action is used, though this can be destructive. Modern
versions of git recommend the `restore` command. The `--staged` option
is used to _unstage files_, or reset the index. Changes remain in the
working directory.

```{.text}
$ echo "change" >> CONTRIBUTING.md
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   CONTRIBUTING.md

no changes added to commit (use "git add" and/or "git commit -a")
$ git add CONTRIBUTING.md
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   CONTRIBUTING.md

$ git restore --staged CONTRIBUTING.md
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   CONTRIBUTING.md

no changes added to commit (use "git add" and/or "git commit -a")
```

The `restore` command without the `--staged` option is used to discard
changes in the working directory - this is a destructive operation as
the file in the working directory is reset to its state in the last
commit.

```{.text}
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   CONTRIBUTING.md

no changes added to commit (use "git add" and/or "git commit -a")
$ git restore CONTRIBUTING.md
$ git status
On branch main
nothing to commit, working tree clean
```
