---
author: Alex Neville
date: 2023-02-21
title: Introduction to Git
---

A version control system records changes made to a file or set of files,
making it possible to view and recover previous versions as required.
Git is a popular, free and open source _distributed_ version control
system.

The majority of git operations are local and do not require network
access, this allows many different developers to work on the same
project simultaneously without the availability of a central server. Git
manages tracked files with snapshots, rather than _diffs_ or _deltas_;
changed files get a new snapshot. Git makes frequent use of checksums to
ensure data integrity, such as using a checksum to identify file
snapshots.

Most git actions add data to the database and very few actually remove
data from the database, thus deleting a file in the working repository
does not mean its history is removed from the git database. Files exist
in one of three states:

- _Committed_ files have a current snapshot in the git database.
- _Modified_ files exist with changes in the working directory, but
  those changes have not yet been added to the git database.
- _Staged_ files are marked for inclusion in the next commit a current
  snapshot of the file will be added to the database.

The working area is a _checkout_ of one version of a project. The
_staging_ area is managed by git to calculate which files will be
included in the next commit. This is technically referred to as the
index.

```{.text}
pwd       staged      .git
 |          |           |
 |     <-checkout-      |
 |          |           |
 | -stage-> |           |
 |          |           |
 |          | -commit-> |
 |          |           |
```

## Setup

The `git config` command is used to set configuration options. The
default behaviour matches `git config --local` and the options are set
for the current repository only, using the file `.git/config` (in the
git directory of the current project). The `--global` flag sets options
for all repositories for the current user and writes to a file such as
`~/.gitconfig` or `~/.config/git/config`. Options can be set for all
users on the system with the `--system` flag (requires root user
privileges). Local configuration options take precedence over global
options, which in turn take precedence over system-wide options.

Some common configuration options:

```{.text}
$ git config --global user.name "Alexander Neville"
$ git config --global user.email "dev@alexneville.co.uk"
$ git config --global core.editor nvim
$ git config --global init.defaultBranch main
$ git config --global credential.helper store
$ git config --global user.signingkey
```

The list of configuration options which apply to the current directory
can be shown with `git config --list`.

## Command Line Help

There are three ways to retrieve the manual page for any git sub-command
or _verb_, as they are often called.

```{.text}
$ git help <command>
$ git <command> --help
$ man git-<command>
```

All git commits have the `-h` flag which concisely shows usage options,
rather than the complete manual page.

## Creating a Git Repository

To create a git repository, a `.git` directory must be created in a
folder. To start versioning a project with git, change into the existing
project directory, or create a new directory and do the same. Then run
`git init`. If required take a snapshot of the existing files as they
are when the git directory is created:

```{.text}
$ git add *
$ git commit -m "Initial Commit"
```

Alternatively, create a copy of an existing project using `git clone`.
_Cloning_ an existing project creates a new directory (defaults to the
name of the repository, if not specified) and fetches the required git
information for that project. The clone command also _checks out_ a copy
of the current version to the working directory.

```{.text}
$ git clone https://github.com/alexanderneville/website <local-directory>
```

## References

- [Official Git Reference](https://git-scm.com/docs)
- [Pro Git Book](https://git-scm.com/book/en/v2)
