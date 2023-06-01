# Git Branches

The branch information can be suppressed/shown with the `--no-decorate`
/ `--decorate` flags.

```{.text}
$ git log --oneline --no-decorate
2e41557 create index.html
f47ea70 create CONTRIBUTING
2c35a17 create README
$ git log --oneline --decorate
2e41557 (HEAD -> main) create index.html
f47ea70 create CONTRIBUTING
2c35a17 create README
```

`HEAD` points to the current branch. Each branch is a lightweight
pointer to a commit. Each commit points to one or more parent commits.

## Creating a Branch

The `git branch` command is used to list and create branches. With the
`--list` argument or no optional arguments, the local branches are
listed. The `-r` flag can be used to list remote branches and `-a` can
be used to list both local and remote branches. An optional string
argument can be used to create a new branch.

```{.text}
$ git branch branch1
$ git branch
  branch1
* main
$ git log --oneline --decorate
2e41557 (HEAD -> main, branch1) create index.html
f47ea70 create CONTRIBUTING
2c35a17 create README
```

The branch command does not move the `HEAD` pointer to the new branch,
but it does create the branch at the same place by default.
`git checkout` moves onto the specified branch.

```{.text}
$ git checkout branch1
Switched to branch 'branch1'
$ git branch
* branch1
  main
$ git log --oneline --decorate
2e41557 (HEAD -> branch1, main) create index.html
f47ea70 create CONTRIBUTING
2c35a17 create README
```

Creating a commit on the new branch, moves the head pointer and the
branch under it to the new commit.

```{.text}
$ nvim index.html
$ git add index.html
$ git commit -m "modify index.html"
[branch1 585702a] modify index.html
 1 file changed, 2 insertions(+), 1 deletion(-)
$ git log --oneline --decorate
585702a (HEAD -> branch1) modify index.html
2e41557 (main) create index.html
f47ea70 create CONTRIBUTING
2c35a17 create README
$ git log --oneline --decorate --graph
* 585702a (HEAD -> branch1) modify index.html
* 2e41557 (main) create index.html
* f47ea70 create CONTRIBUTING
* 2c35a17 create README
```

By using `git checkout` to return to the main branch the log no long
shows commits made after the commit pointed to by the current branch.
The `--all` flag will show late commits.

```{.text}
$ git checkout main
Switched to branch 'main'
$ git log --oneline --decorate --graph
* 2e41557 (HEAD -> main) create index.html
* f47ea70 create CONTRIBUTING
* 2c35a17 create README
$ git log --oneline --decorate --graph --all
* 585702a (branch1) modify index.html
* 2e41557 (HEAD -> main) create index.html
* f47ea70 create CONTRIBUTING
* 2c35a17 create README
```

Modifying a file and creating a commit creates divergent branches. The
`--graph` option of `git log` is useful for viewing a representation of
the project\'s history.

```{.text}
$ nvim index.html
$ git add index.html
$ git commit -m "modify index.html on main branch"
[main 5aa3361] modify index.html on main branch
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git log --oneline --decorate --graph --all
* 5aa3361 (HEAD -> main) modify index.html on main branch
| * 585702a (branch1) modify index.html
|/
* 2e41557 create index.html
* f47ea70 create CONTRIBUTING
* 2c35a17 create README
```

### Alternative Syntax

Create and switch to a branch with `git checkout -b new-branch-name`.
Use `git switch branch-name` to switch to an existing branch, or
`git switch -c new-branch-name` to create and switch to a branch.

## Merging

### Fast-forward merge

In the most simple case, two branches can be merged by moving one
pointer (branch) forward through the commit history. This is only
possible if the commit pointed to by the current branch can be reached
by traversing the history of the branch to be merged. In other words,
the history of the current branch and the branch to merge are not
divergent. This is called a _fast-forward merge_.

In a new branch (`branch2`), edit a file and make a commit:

```{.text}
$ git switch -c branch2
Switched to a new branch 'branch2'
$ nvim index.html
$ git add index.html
$ git commit -m "add a line to index.html"
[branch2 aea2a4e] add a line to index.html
 1 file changed, 1 insertion(+)
$ git log --oneline --decorate --graph --all
* aea2a4e (HEAD -> branch2) add a line to index.html
* 5aa3361 (main) modify index.html on main branch
| * 585702a (branch1) modify index.html
|/
* 2e41557 create index.html
* f47ea70 create CONTRIBUTING
* 2c35a17 create README
```

Checkout the original branch and merge `branch2`. In this case the
branch is moved to point to a different commit.

```{.text}
$ git checkout main
Switched to branch 'main'
$ git merge branch2
Updating 5aa3361..aea2a4e
Fast-forward
 index.html | 1 +
 1 file changed, 1 insertion(+)
$ git log --oneline --decorate --graph --all
* aea2a4e (HEAD -> main, branch2) add a line to index.html
* 5aa3361 modify index.html on main branch
| * 585702a (branch1) modify index.html
|/
* 2e41557 create index.html
* f47ea70 create CONTRIBUTING
* 2c35a17 create README
$ git branch -d branch2
Deleted branch branch2 (was aea2a4e).
```

### Merging

The merge operation is more complicated when the two branches involved
are divergent, _i.e._ the branch being merged from is not an ancestor of
the branch being merged. A new commit must be created, sometimes called
a `merge commit`.

If both branches modify the same part of a file, git will not be able to
merge automatically due to the conflict (_e.g._ merging `branch1` into
`main` as below). `git status` will report which files have conflicts.

```{.text}
$ git checkout main
Switched to branch 'main'
$ git merge branch1
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
$ git status
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")
```

_Conflict-resolution_ markers are added to those files. They can be
edited manually to remove the conflict.

```{.text}
<<<<<<< HEAD
   <p>Edited on main branch</p>
   <p>Added on branch2</p>
=======
    <p>Modified on branch1</p>
    <p>Added on branch1</p>
>>>>>>> branch1
```

Adding the fixed file and making a commit completes the merge.

```{.text}
$ git add index.html
$ git status
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
        modified:   index.html

$ git commit -m "merge changes to index.html"
[main 25ef8e1] merge changes to index.html
$ git branch -d branch1
Deleted branch branch1 (was f2dfca9).
$ git log --oneline --decorate --graph --all
*   25ef8e1 (HEAD -> main) merge changes to index.html
|\
| * f2dfca9 modify index.html on branch1
| * 585702a modify index.html
* | aea2a4e add a line to index.html
* | 5aa3361 modify index.html on main branch
|/
* 2e41557 create index.html
* f47ea70 create CONTRIBUTING
* 2c35a17 create README
```
