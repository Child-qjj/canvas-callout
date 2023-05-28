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
build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
test: Adding missing tests or correcting existing test
```

### Revert

If the PR reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit

### Scope

The scope could be anything specifying the place of the commit change. For example `dev`, `build`, `workflow`, `cli` etc...
