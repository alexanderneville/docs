---
author: Alex Neville
date: 2023-02-21
title: Introduction to Git
---

It is possible to rebase a topic branch, onto a main branch. Initialise
a new git project, create a commit and a new branch.

```{.text}
$ nvim README.md
$ git add README.md
$ git commit -m "initial commit"
[main (root-commit) 6ea26b6] initial commit
 1 file changed, 5 insertions(+)
 create mode 100644 README.md
$ git checkout -b dev
Switched to a new branch 'dev'
$ nvim index.html
$ git add index.html
$ git commit -m "create index.html"
[dev 6bc9f31] create index.html
 1 file changed, 12 insertions(+)
 create mode 100644 index.html
$ git log --oneline --decorate --graph
* 6bc9f31 (HEAD -> dev) create index.html
* 6ea26b6 (main) initial commit
```

Switch back to the main branch and create a commit. Now, neither of the
two branches is an ancestor of the other; they cannot be merged by
fast-forwarding one of the branches.

```{.text}
$ git checkout main
Switched to branch 'main'
$ echo "# HOW TO" >> CONTRIBUTING.md
$ git add CONTRIBUTING.md
$ git commit -m "add contributing information"
[main f9072c9] add contributing information
 1 file changed, 1 insertion(+)
 create mode 100644 CONTRIBUTING.md
$ git log --oneline --decorate --graph --all
* f9072c9 (HEAD -> main) add contributing information
| * 6bc9f31 (dev) create index.html
|/
* 6ea26b6 initial commit
```

By rebasing the `dev` branch against the `main` branch, the divergent
history is fixed. The `main` branch can now be fast-forwarded to the
`dev` branch by merging the two (an additional commit is not created).

```{.text}
$ git checkout dev
Switched to branch 'dev'
$ git rebase main
Successfully rebased and updated refs/heads/dev.
$ git log --oneline --decorate --graph --all
* 7d8c32a (HEAD -> dev) create index.html
* f9072c9 (main) add contributing information
* 6ea26b6 initial commit
$ git checkout main
Switched to branch 'main'
$ git merge dev
Updating f9072c9..7d8c32a
Fast-forward
 index.html | 12 ++++++++++++
 1 file changed, 12 insertions(+)
 create mode 100644 index.html
$ git log --oneline --decorate --graph --all
* 7d8c32a (HEAD -> main, dev) create index.html
* f9072c9 add contributing information
* 6ea26b6 initial commit
```

With the `dev` branch checked out, the following forms are equivalent:

- `git rebase main`
- `git rebase main dev`

# Rebase Onto

It is possible to rebase a topic branch, created from another topic
branch, onto a different branch altogether. For this example, initialise
a new git project, create a commit and branch twice.

```{.text}
$ git init
$ nvim README.md
$ git add README.md
$ git commit -m "initial commit"
[main (root-commit) a54b095] initial commit
 1 file changed, 5 insertions(+)
 create mode 100644 README.md
$ git switch -c dev
Switched to a new branch 'dev'
$ nvim index.html
$ git add index.html
$ git commit -m "add index.html"
[dev 04833de] add index.html
 1 file changed, 12 insertions(+)
 create mode 100644 index.html
$ git checkout -b doc
Switched to branch 'doc'
$ nvim CONTRIBUTING.md
$ git add CONTRIBUTING.md
$ git commit -m "add contributing information"
[doc a450ddc] add contributing information
 1 file changed, 1 insertion(+)
 create mode 100644 CONTRIBUTING.md
```

Create divergent history between the `dev` and `doc` branches.

```{.text}
$ git checkout dev
Switched to branch 'dev'
$ nvim index.html
$ git add index.html
$ git commit -m "update index page"
[dev 5c2395a] update index page
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git log --oneline --decorate --graph --all
* 5c2395a (HEAD -> dev) update index page
| * a450ddc (doc) add contributing information
|/
* 04833de add index.html
* a54b095 (main) initial commit
```

Create divergent history between the `main` and `dev` branches.

```{.text}
$ git checkout main
Switched to branch 'main'
$ nvim makefile
$ git add makefile
$ git commit -m "add makefile"
[main fada83c] add makefile
 1 file changed, 1 insertion(+)
 create mode 100644 makefile
$ git log --oneline --decorate --graph --all
* fada83c (HEAD -> main) add makefile
| * 5c2395a (dev) update index page
| | * a450ddc (doc) add contributing information
| |/
| * 04833de add index.html
|/
* a54b095 initial commit
```

Rebase the `doc` branch onto the main branch, then rebase the `dev`
branch onto the `doc` branch.

```{.text}
$ git rebase --onto main dev doc
Successfully rebased and updated refs/heads/doc.
$ git log --oneline --decorate --graph --all
* c0cb01d (HEAD -> doc) add contributing information
* fada83c (main) add makefile
| * 5c2395a (dev) update index page
| * 04833de add index.html
|/
* a54b095 initial commit
$ git rebase doc dev
Successfully rebased and updated refs/heads/dev.
$ git log --oneline --decorate --graph --all
* d329271 (HEAD -> dev) update index page
* 2d9bc3c add index.html
* c0cb01d (doc) add contributing information
* fada83c (main) add makefile
* a54b095 initial commit
```

Checkout the `main` branch and fast-forward it through the commit
history. Delete the branches that have been _\"merged\"_.

```{.text}
$ git checkout main
Switched to branch 'main'
$ git merge dev
Updating fada83c..d329271
Fast-forward
 CONTRIBUTING.md |  1 +
 index.html      | 12 ++++++++++++
 2 files changed, 13 insertions(+)
 create mode 100644 CONTRIBUTING.md
 create mode 100644 index.html
$ git branch -d dev
Deleted branch dev (was d329271).
$ git branch -d doc
Deleted branch doc (was c0cb01d).
$ git log --oneline --decorate --graph --all
* d329271 (HEAD -> main) update index page
* 2d9bc3c add index.html
* c0cb01d add contributing information
* fada83c add makefile
* a54b095 initial commit
```
