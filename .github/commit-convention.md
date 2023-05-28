## Git Commit Message Convention

> This is adapted from [Vites's commit convention](https://github.com/vitejs/vite/edit/main/.github/commit-convention.md).

#### TL;DR:

Messages must be matched by the following regex:

<!-- prettier-ignore -->
```js
/^(revert: )?(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\(.+\))?!?: .{1,50}/
```

#### Examples

```
feat(dev): add 'comments' option
fix(dev): fix dev error
perf(build)!: remove 'foo' option
revert: feat(compiler): add 'comments' option
docs (documentation)
style (formatting, missing semi colons, …)
refactor
test (when adding missing tests)
chore (maintain)
```

### Revert

If the PR reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit

### Scope

The scope could be anything specifying the place of the commit change. For example `dev`, `build`, `workflow`, `cli` etc...
