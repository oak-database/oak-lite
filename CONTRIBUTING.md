# Contributing

Everyone is welcome to contribute towards `oak-lite` development. This document is intended to guide you in making
effective contributions to the package.

## Issues

Creating an issue on GitHub is a great way to report problems, ask questions, and make suggestions. An issue can be
created by clicking [here](https://github.com/oak-database/oak-lite/issues/new).

If you are reporting a problem, please try to give a thorough description of the problem. It would be helpful to include
the version of `oak-lite` and Node.js that you are using.

## Contributor workflow

This package is maintained using the "contributor workflow". All changes to the repository, without exception, are
proposed using pull requests. This facilitates open discussion, testing, and peer review.

### Creating pull requests

To create a pull request:

1. [Fork the repository](https://help.github.com/articles/fork-a-repo/) to your GitHub account
2. [Clone the fork](https://help.github.com/articles/cloning-a-repository/) to your development machine
3. [Create a branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) for your changes
4. [Develop](#developing) your changes
5. [Commit](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) your changes
5. [Push](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches#Pushing) your branch to your GitHub fork
6. [Create a pull request](https://help.github.com/articles/creating-a-pull-request/) with your changes

Commits should generally be [atomic](https://en.wikipedia.org/wiki/Atomic_commit#Atomic_commit_convention), affecting
only one part of the package at a time. Similarly, the best pull requests are those that only add one feature, fix one
bug, or refactor code. Pull requests that refactor code are easiest to review when they make only one of three types of
changes: moving code, fixing code style, or reducing code complexity.

While there are no strict rules for a pull request, adhering to these guidelines will make it easier for your changes to
be reviewed and merged into the package.

### Reviewing pull requests

Anyone may contribute by reviewing open pull requests. Reviews typically check for obvious coding errors, accompanying
changes to tests and documentation, code readability, and usefulness of the changes. Project maintainers will take
reviews into account when determining whether or not to merge a pull request. Peer reviews often include the following
language:

* `ACK`: "I have tested the code, and I agree that this should be merged"
* `NACK`: "I disagree that this should be merged" (must be acommpanied by a justification)
* `utACK`: "I have not tested the code, but I have reviewed it and agree that this should be merged"
* `Concept ACK`: "I have not tested or reviewed the code, but I agree with the principle of this pull request"
* `Nit`: Refers to trivial, non-blocking issues

### Merging pull requests

Project maintainers have the final ability to merge a pull request, but they should consider reviews when deciding
whether or not to merge a pull request.

### Deployment

Deployment as an npm package should be performed automatically by the continuous integration setup (Travis) when a
project maintainer tags a release commit.

[Semantic versioning](http://semver.org/) is used for release versioning. Release versions may be preceded by at least one
pre-release version, with a version number such as `1.0.0-alpha.1`.

## Developing

Developing the `oak-lite` package requires [Node.js](https://nodejs.org/).

### Getting started

The following should prepare you for development:

```bash
# Clone your fork
git clone git@github.com:YOUR_NAME/oak-lite.git
cd oak-lite

# Install development devDependencies
npm install

# Check out a new branch
git checkout -b MY-NEW-FEATURE
```

### Development scripts

The following development scripts are available to help you while working on the package:

* `npm test`: Builds the project and runs the test suite
* `npm run build`: Builds the project from `src` into `.dist`
* `npm run lint`: Lints the project for syntax and styling errors
* `npm run coverage`: Runs the test suite and prints out the code coverage
